// https://gist.github.com/abohannon/cca2dd998edf9dc2c2165f538eece4b2
// https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146
// https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
// https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
/* global sessionStorage */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (sessionStorage.getItem('tkn') ? <Component {...props} /> : <Redirect to='/login' />)} />
)

export default PrivateRoute
