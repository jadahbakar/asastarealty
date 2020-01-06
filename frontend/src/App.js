import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import PrivateRoute from './component/PrivateRoute'

const loading = () => (
  <div className='animated fadeIn pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse' />
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'))
const Register = React.lazy(() => import('./views/Pages/Register'))
const Page503 = React.lazy(() => import('./views/Pages/Page503'))
const ForgetPassword = React.lazy(() => import('./views/Pages/ForgetPassword'))

const App = () => {
  const content = (
    <Router basename='/'>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path='/503' name='Page503' render={props => <Page503 {...props} />} />
          <Route exact path='/register' name='Register' render={props => <Register {...props} />} />
          <Route exact path='/forgetpassword' name='ForgetPassword' render={props => <ForgetPassword {...props} />} />
          <Route exact path='/login' name='Login' render={props => <Login {...props} />} />
          <PrivateRoute path='/' name='Home' component={DefaultLayout} />
        </Switch>
      </React.Suspense>
    </Router>
  )
  return content
}

export default App
