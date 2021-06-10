import React, { useEffect, useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { socketIO } from '../common/socketIO'
import BackdropComp from '../components/BackdropComp'
import { useAppContext } from '../context/AppProvider'
import AppRouter from './AppRouter'
import AuthRouter from './AuthRouter'

const RouteProvider = () => {
    const [loading, setLoading] = useState(true)
    const [{userId}, dispatch] = useAppContext()

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if(userId) {
            dispatch({
                type: 'LOGIN_USER',
                payload: userId
            })
            setLoading(false)
        }
        setLoading(false)
        socketIO.connect()
    }, [dispatch])

    if(loading) {
        return <BackdropComp />
    }

    return (
        <HashRouter basename='http://192.168.0.10:3000'>
            {userId ? <AppRouter /> : <AuthRouter />}
        </HashRouter>
    )
}

export default RouteProvider
