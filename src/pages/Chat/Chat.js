import { IconButton, makeStyles } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import ChatAppBar from './ChatAppBar'
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import { appColors, base_url } from '../../common/variables';
import { socketIO } from '../../common/socketIO';
import { useAppContext } from '../../context/AppProvider';
import { useFetch } from '../../hooks/useFetch';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    main: {
        width: '100%',
        flex: 1,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
    },
    message_container: {
        display: 'inline-block',
        marginBottom: '5px',
        alignSelf: 'start',
        backgroundColor: appColors.transparent,
        borderEndEndRadius: '5px',
        borderTopLeftRadius: '5px',
        padding: '5px 10px', 
    },
    message_friend_container: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginBottom: '5px',
        alignSelf: 'flex-end',
        borderEndStartRadius: '5px',
        borderTopRightRadius: '5px',
        backgroundColor: appColors.tertiary,
        padding: '5px 10px', 
    },
    sender_name: {
        fontSize: '14px',
        margin: '5px 0',
    },
    sender_friend_name: {
        fontSize: '14px',
        margin: '5px 0',
        color: 'white'
    },
    message: {
        display: 'inline-block',
        padding: '10px 5px', 
        borderLeft: '3px solid white',
        ordWrap: 'break-word',
        overflowWrap: 'break-word',
        maxWidth: '500px'
    },
    message_friend: {
        color: 'white',
        display: 'inline-block',
        padding: '10px 5px', 
        borderRight: '3px solid white',
        ordWrap: 'break-word',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        maxWidth: '500px'
    },
    chatInputContainer: {
        height: '60px',
        display: 'flex',
        backgroundColor: '#e5e5e5',
    },
    chatInput: {
        flex: 1,
        border: 'none',
        padding: '0 20px',
        fontSize: '18px',
        background: 'none',
        outline: 'none'
    },
    micContainer: {
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const Chat = () => {
    const classes = useStyles()

    const [loading, error, request, clearError] = useFetch()
    const [{chat}, dispatch] = useAppContext()
    const [text, setText] = useState('') 
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchLatestMessages()

        async function fetchLatestMessages() {
            try {
                const data = await request(base_url + '/api/chat/getLatestChats')

                dispatch({
                    type: 'GET_LATEST_CHATS',
                    payload: [...data].reverse()
                })
            } catch (e) {
                console.log(e.message)
                clearError()
            }
        }
        
    }, [])

    useEffect(() => {
        scrollToBottom()

        const addMsg = (data) => {
            dispatch({
                type: 'ADD_MSG',
                payload: data
            })
        }

        socketIO.on('get_message', addMsg)

        return () => {
            socketIO.off('get_message', addMsg)
        }
    }, [chat])

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessageBtn = () => {
        const id = localStorage.getItem('userId')
        socketIO.emit('send_message', {id, msg: text})
        // socketIO.emit('send_message', {id, msg: text})
        scrollToBottom()

        setText('')
    }

    const handleChat = (msg) => {
        const id = localStorage.getItem('userId')

        if(msg.user._id !== id) {
            return (
                <div className={classes.message_container}>
                    <p className={classes.sender_name}>- {msg.user.name}</p>
                    <p className={classes.message}>{msg.msg}</p>
                </div>
            )
        }

        return (
            <div className={classes.message_friend_container}>
                <p className={classes.sender_friend_name}>{msg.user.name} -</p>
                <p className={classes.message_friend}>{msg.msg}</p>
            </div>
        )
    }

    return (
        <div className={classes.container}>
            <ChatAppBar />
            <div className={classes.main}>
                {
                    chat.length ? chat.map((msg) => handleChat(msg)) : <p>Opta</p>
                }
                <div ref={messagesEndRef} />
            </div>
            <div className={classes.chatInputContainer}>
                <input 
                    type="text" 
                    className={classes.chatInput} 
                    placeholder='Сообщение' 
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <div className={classes.micContainer}>
                    {!text.length ? (
                        <IconButton>
                            <MicIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleSendMessageBtn}>
                            <SendIcon />
                        </IconButton>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Chat
