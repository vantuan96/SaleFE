import React, { Suspense } from 'react';
import {
    Redirect,
    Switch
} from 'react-router-dom'
import routes from '../../routes.js'
import { PrivateRoute } from "../../components/PrivateRoutes";
const TheContent = () => {
    return (

        <Suspense >
        <Switch>
            {routes.map((route, idx) => {
                return route.component && (
                         
                  
                    <PrivateRoute
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={route.component}
                        render={props => (
                            <route.component {...props} />
                        )} />
                )
            })}
            <Redirect from="/" to="/Home/Index" />
        </Switch>
    </Suspense>
    )
}
export default React.memo(TheContent)