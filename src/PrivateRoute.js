import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route className="col-8" {...rest} render={props => (
        localStorage.getItem('user')
            ?
            <div>
                <Component {...props} />
            </div>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)