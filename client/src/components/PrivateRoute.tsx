import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { RootState } from "../store"

interface PrivateRouteProps {
  component: React.FC<any>
}

const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({ component: Component, ...routerProps }) => {
  const authState = useSelector<RootState, RootState['auth']>(state => state.auth)

  return (
    <Route {...routerProps} render={(props) => (
      authState.loggedIn
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}

export default PrivateRoute