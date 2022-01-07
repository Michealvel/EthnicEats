import React from 'react';
import { Route, Redirect } from "react-router-dom";
import AuthService from '../services/auth.service';

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    const user = AuthService.getCurrentUser();
    return (
        <Route {...rest} render={(props) => (
            (auth || user) ? <Component {...props} /> : <Redirect to='/' />
        )} />
    )
}


export default GuardedRoute;