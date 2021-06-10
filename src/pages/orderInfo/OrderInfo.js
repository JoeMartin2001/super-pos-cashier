import React, { useCallback, useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { appColors, base_url } from '../../common/variables';
import { useFetch } from '../../hooks/useFetch';
import CustomSpinner from '../../components/CustomSpinner';
import NetworkError from '../../components/NetworkError';
import BlockIcon from '@material-ui/icons/Block';
import OrderInfoBody from './OrderInfoBody';
import OrderCommentDialog from './OrderCommentDialog';

const OrderInfo = (props) => {
    const orderId = props.match.params.id
    const [order, setOrder] = useState(null)
    const [loading, error, request, clearError] = useFetch()

    const fetchTableInfo = useCallback(async() => {
        try {
            const data = await request(base_url + `/api/table/getTableById/${orderId}`)
            console.log(data)
            setOrder(data)
        } catch (_) {
            console.error(_.message)
            clearError()
        }
    }, [request, orderId])

    useEffect(() => {
        fetchTableInfo()

    }, [fetchTableInfo])

    const handleOrderInfo = () => {
        if(loading) return <CustomSpinner />
        if(error) return <NetworkError />
        if(order) return <OrderInfoBody order={order} />
    }

    return (
        <div style={styles.container}>
            <div style={styles.appBar}>
                <div style={styles.appBar_left}> 
                    <IconButton style={{color: 'white'}} aria-label="upload picture" component={Link} to='/'>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" style={{color: 'white', marginLeft: '16px'}}>
                        О заказе
                    </Typography>
                </div>  
                <div style={styles.appBar_right}>
                    {
                        order && (
                            <IconButton aria-label="upload picture" style={{color: 'white'}}>
                                {
                                    order.comment.length ? 
                                        <OrderCommentDialog comment={order.comment} /> 
                                        : <BlockIcon fontSize='large' />
                                }
                            </IconButton> 
                        )
                    }
                </div>
            </div>
            {handleOrderInfo()}
        </div>
    )
}

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
    },
    appBar: {
        backgroundColor: appColors.secondary,
        height: '10vh',
        padding: '0 2%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },  
    appBar_left: {
        display: 'flex',
        alignItems: 'center',
    },
}

export default OrderInfo
