/* global sessionStorage */
import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import axios from 'axios'
import { API_ROOT } from 'api'
// import Swal from 'sweetalert2'

// import { useHttpA } from 'httpA';

import { useHttp } from 'component'
// import { useAmbil } from 'ambil'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react'
// ---sidebar nav config
// import navigation from '../../_nav';
// ---routes config
import routes from '../../routes'

const backEnd = `${API_ROOT}/home`
const backLogout = `${API_ROOT}/logout`
const DefaultAside = React.lazy(() => import('./DefaultAside'))
const DefaultFooter = React.lazy(() => import('./DefaultFooter'))
const DefaultHeader = React.lazy(() => import('./DefaultHeader'))

const loading = () => (
  <div className='animated fadeIn pt-1 text-center'>
    <div className='sk-spinner sk-spinner-pulse' />
  </div>
)

const DefaultLayout = props => {
  const redirect = false
  // const [redirect, setRedirect] = useState(false)
  // const [alert, setAlert] = useState(null)

  // --------------------------------------- M E N U
  let navigationx
  const [menuList] = useHttp(`${backEnd}/usermenu`, sessionStorage.getItem('tkn'), [])

  if (menuList.getMenu !== undefined) {
    const userMenu = menuList.getMenu.map(data => data.menu)
    navigationx = { items: userMenu }
  }

  // --------------------------------------- CHECK SESSION
  axios.defaults.headers.common.Authorization = sessionStorage.getItem('tkn')
  axios
    .get(`${backEnd}`)
    .then(response => {
      if (response.status !== 200) {
        // setRedirect(true)
        onConfirmAlert()
      } else {
        sessionStorage.removeItem('menu')
      }
    })
    .catch(error => {
      if (!error.status) {
        onConfirmAlert()
        // Swal.fire({
        //   type: 'warning',
        //   title: '',
        //   text: 'Maaf Session Anda Sudah berakhir...\n Silahkan Login Kembali...',
        //   timer: 1000,
        //   footer: '@asastarealty'
        // }).then(result => {
        //   onConfirmAlert()
        // })
      }
    })

  // --------------------------------------- A L E R T
  // const hideAlert = () => {
  //   setAlert(null)
  // }

  const onConfirmAlert = () => {
    // hideAlert()
    sessionStorage.clear()
    props.history.push('/login')
  }

  // --------------------------------------- SignOut
  const signOut = e => {
    e.preventDefault()
    axios.defaults.headers.common.Authorization = sessionStorage.getItem('tkn')
    axios.post(`${backLogout}`).then(response => {
      // console.log('TCL: response', response.data)
      console.log('Matur Nuwun')
    }).catch(error => { if (error) { console.log(error) } })

    sessionStorage.clear()
    props.history.push('/login')
  }

  // --------------------------------------- DidMount
  useEffect(() => {
    axios.defaults.headers.common.Authorization = sessionStorage.getItem('tkn')
    axios
      .get(`${backEnd}`)
      .then(response => {
        if (response.status !== 200) {
          // setRedirect(true)
          onConfirmAlert()
        } else {
          sessionStorage.removeItem('menu')
        }
      })
      .catch(error => {
        if (!error.status) {
          // Swal.fire({
          //   type: 'warning',
          //   title: '',
          //   text: 'Maaf Session Anda Sudah berakhir...\n Silahkan Login Kembali...',
          //   timer: 1000,
          //   footer: '@asastarealty'
          // }).then(result => {
          //   onConfirmAlert()
          // })
          onConfirmAlert()
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const content = (
    <div className='app'>
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => signOut(e)} />
        </Suspense>
      </AppHeader>
      <div className='app-body'>
        <AppSidebar fixed display='lg'>
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigationx} {...props} />
            {/* <AppSidebarNav navConfig={navigation} {...props} /> */}
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>

        <main className='main'>
          <AppBreadcrumb appRoutes={routes} />
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => <route.component {...props} />} />
                  ) : null
                })}
                <Redirect from='/' to='/dashboard' />
              </Switch>
            </Suspense>
          </Container>
          {alert}
        </main>
        <AppAside fixed>
          <Suspense fallback={loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  )

  if (redirect) {
    return <Redirect to='/login' />
  }
  return content
}

export default DefaultLayout
