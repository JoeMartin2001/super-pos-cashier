import React from 'react'
import { Route, Switch } from 'react-router'
import Login from '../pages/login/Login'

const AuthRouter = () => {
    return (
        <Switch>
            <Route path='/'>
                <Login />
            </Route>
        </Switch>
    )
}

export default AuthRouter
