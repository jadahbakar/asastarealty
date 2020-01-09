/* global sessionStorage */
import React, { Suspense, useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import axios from 'axios'
import { API_ROOT } from 'api'
import Swal from 'sweetalert2'

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
const DefaultAside = React.lazy(() => import('./DefaultAside'))
const DefaultFooter = React.lazy(() => import('./DefaultFooter'))
const DefaultHeader = React.lazy(() => import('./DefaultHeader'))

const loading = () => (
  <div className='animated fadeIn pt-1 text-center'>
    <div className='sk-spinner sk-spinner-pulse' />
  </div>
)

const DefaultLayout = props => {
  const [redirect, setRedirect] = useState(false)
  const [alert, setAlert] = useState(null)

  // --------------------------------------- M E N U
  let navigationx
  const [menuList] = useHttp(`${backEnd}/usermenu`, sessionStorage.getItem('tkn'), [])

  if (menuList.getMenu !== undefined) {
    const userMenu = menuList.getMenu.map(data => data.menu)
    navigationx = { items: userMenu }
  }

  // --------------------------------------- A L E R T
  const hideAlert = () => {
    setAlert(null)
  }

  const onConfirmAlert = () => {
    hideAlert()
    sessionStorage.clear()
    props.history.push('/login')
  }

  // const showAlert = (title, message) => {
  //   setAlert(
  //     <SweetAlert warning title={title} onConfirm={onConfirmAlert}>
  //       {message}
  //     </SweetAlert>
  //   );
  // };

  // --------------------------------------- SignOut
  const signOut = e => {
    e.preventDefault()
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
          setRedirect(true)
        } else {
          sessionStorage.removeItem('menu')
        }
      })
      .catch(error => {
        if (!error.status) {
          Swal.fire({
            type: 'warning',
            title: '',
            text: 'Maaf Session Anda Sudah berakhir...\n Silahkan Login Kembali...',
            timer: 1000,
            footer: '@asastarealty'
          }).then(result => {
            onConfirmAlert()
          })

          // showAlert(
          //   'Warning',
          //   'Maaf Session Anda Sudah berakhir...\n Silahkan Login Kembali...'
          // );
        }
      })
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
