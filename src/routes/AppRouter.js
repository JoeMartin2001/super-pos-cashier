import { ThemeProvider } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { socketIO } from '../common/socketIO'
import Analytics from '../pages/Analytics/Analytics'
import CartInfo from '../pages/CartInfo/CartInfo'
import Chat from '../pages/Chat/Chat'
import CreateOrder from '../pages/CreateOrder/CreateOrder'
import Dashboard from '../pages/Dashboard/Dashboard'
import Finances from '../pages/Finances/Finances'
import Hall from '../pages/Hall/Hall'
import History from '../pages/History/History'
import Home from '../pages/home/Home'
import OrderInfo from '../pages/orderInfo/OrderInfo'
import { appTheme } from '../theme/appThemes'
const { Notification } = window.require('electron').remote;

function showNotification(data) {
    const userId = localStorage.getItem('userId')

    if(userId !== data.user._id) {
        new Notification({
            title: data.user.name,
            body: data.msg,
            icon: '/logo192.png'
        }).show()
    }
}

const AppRouter = () => {

    useEffect(() => {
        socketIO.on('get_message', (data) => showNotification(data))

        return () => {
            socketIO.off('get_message', () => showNotification())
        }
    }, [])
    return (
        <ThemeProvider theme={appTheme}>
            <Switch>
                <Route path='/orderInfo/:id' component={OrderInfo} />
                <Route path='/createOrder'>
                    <CreateOrder />
                </Route>
                <Route path='/history'>
                    <History />
                </Route>
                <Route path='/chat'>
                    <Chat />
                </Route>
                <Route path='/hall'>
                    <Hall />
                </Route>
                <Route path='/dashboard'>
                    <Dashboard />
                </Route>
                <Route path='/analytics'>
                    <Analytics />
                </Route>
                <Route path='/finances'>
                    <Finances />
                </Route>
                <Route path='/cartInfo'>
                    <CartInfo />
                </Route>
                <Route exact path='/'>
                    <Home />
                </Route>
            </Switch>
        </ThemeProvider>
    )
}

export default AppRouter
