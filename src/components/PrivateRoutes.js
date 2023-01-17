import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// console.log(    localStorage.getItem('token'))
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
    true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/Home/Index', state: { from: props.location } }} />
    )} />
  )