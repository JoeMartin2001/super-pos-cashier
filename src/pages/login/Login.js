import { Button, makeStyles, TextField, ThemeProvider, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { appColors, base_url } from '../../common/variables'
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { useAppContext } from '../../context/AppProvider';
import { useFetch } from '../../hooks/useFetch';
import { inputTheme } from '../../theme/appThemes'

const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            borderColor: 'white',
            },
            '&:hover fieldset': {
            borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
            borderColor: 'white',
            },
        },
    },
})(TextField);

const Login = () => {
    const [snack, setSnack] = useState(false)
    const [snackContent, setSnackContent] = useState('Что-то пошло не так!')
    const [{}, dispatch] = useAppContext()
    const [, , request,] = useFetch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        try {
            const data = await request(base_url + '/api/auth/login', 'POST', {login: login, password: password})
            dispatch({
                type: 'LOGIN_USER',
                payload: data._id
            })
        } catch (_) {
            setSnackContent(_.message)
            setSnack(true)
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.heading_container}>
                <img src='img/cashier-desk.png' alt='Cashier desk' style={styles.cashier_image} />
                <h1 style={styles.heading_text}>Super POS Cashier</h1>
            </div>
            <ThemeProvider theme={inputTheme}>
                <div style={styles.fields_container} autoComplete="off">
                    <CssTextField
                        style={styles.field}
                        label="Логин"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        margin='dense'
                        fullWidth
                        required
                        inputProps={{style: {color: 'white'}}}
                        value={login}
                        onChange={(event) => setLogin(event.target.value)}
                    />
                    <CssTextField
                        type='password'
                        style={styles.field}
                        label="Пароль"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        margin='dense'
                        fullWidth
                        required
                        inputProps={{style: {color: 'white'}}}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button 
                        variant='contained' 
                        style={{marginTop: '20px'}} 
                        size='large'
                        onClick={() => handleLogin()}
                    >
                        Войти
                    </Button>
                </div>
                <CustomSnackbar 
                    snack={snack} 
                    setSnack={setSnack} 
                    type='error' 
                    content={snackContent}
                />
            </ThemeProvider>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: appColors.primary,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        padding: '2% 0'
    },
    heading_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px'
    },
    cashier_image: {
        width: '120px'
    },
    heading_text: {
        margin: '20px',
        color: 'white',
        fontFamily: 'Amsterdam',
        fontStyle: 'italic',
        fontSize: '22px',
        textAlign: 'center'
    },
    fields_container: {
        height: '150px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    field: {
        margin: '12px 0px',
    },
    label: {
        color: 'white'
    }
}

export default Login
