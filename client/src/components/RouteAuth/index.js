import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RouteAuth = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    1 === 1 ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={{ pathname: '/welcome' }} />
    )
  )}/>
)

export default RouteAuth;
