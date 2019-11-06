import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AUTHENTICATED, ADMIN } from '../../constants/sessionstorage';

const ProtectedRoute = function({component: Component, isAdmin, ...rest}) {
    return(
        <Route {...rest} render = {(props) => (
        (sessionStorage.getItem(AUTHENTICATED) )
            ? <Component {...props} />
            : <Redirect to="/"/>
         )}/>
    );
} 
export { ProtectedRoute };