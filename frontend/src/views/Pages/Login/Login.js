/* global sessionStorage */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Row, Form } from 'reactstrap'
import { Inputan, LogoSVG, MyAlert } from 'component'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { API_ROOT } from 'api'
import ErrorMessage from './errorMessage'
import packageJson from '../../../../package.json'
import { encrypt } from 'utils/encrypt'
import styles from './login.css'
const backEndLogin = `${API_ROOT}/login`

const Login = () => {
  const login = (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='8'>
            <CardGroup className='box'>
              <LeftCard />
              <RightCard />
            </CardGroup>
            <BottomTitle />
          </Col>
        </Row>
      </Container>
    </div>
  )

  return login
}

const LeftCard = () => {
  const { LeftCard, FontButton, FontAnchorLupaPassword } = styles
  const { errors, register, handleSubmit, reset } = useForm({ defaultValues: { userId: '', password: '' } })
  const [tokenLogin, setTokenLogin] = useState([])

  const hideAlert = () => {
    reset()
    fetchData()
  }
  // ------------works
  // const [tokenLogin] = useHttp(`${backEndLogin}`, '', []);
  // --------------------------------------- S U B M I T

  const fetchData = async () => {
    const result = await axios(`${backEndLogin}`)
    setTokenLogin(result.data.token)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = data => {
    const { userId, password } = data
    const hashString = encrypt(password, tokenLogin)

    axios.defaults.headers.common.Authorization = tokenLogin
    axios
      .post(`${backEndLogin}`, {
        userid: userId,
        userpass: hashString
      })
      .then(response => {
        const { token, getUser } = response.data
        sessionStorage.clear()
        sessionStorage.setItem('tkn', token)
        sessionStorage.setItem('login', false)
        if (getUser.userid_login.user_sts === 1) {
          window.location.href = '/'
        } else {
          MyAlert('warning', '', 'Maaf User Anda Tidak Aktif...\n Silahkan Menghubungi Admin...', 2000, hideAlert)
        }
      })
      .catch(error => {
        MyAlert('warning', 'Maaf Terdapat Kegagalan', `[${error.response.status}] ${error.response.data.message}`, 2000, hideAlert)
      })
  }

  const content = (
    <Card
      className={`p-4 ${LeftCard}`}
    >
      <CardBody>
        <h1>Login</h1>
        <p className='text-muted'>Sign In to your account</p>
        <br />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Inputan
            icon='fa fa-user'
            name='userId'
            type='text'
            placeholder='User ID'
            focus
            innerRef={register({ required: true, minLength: 3 })}
            error={<ErrorMessage error={errors.userId} />}
          />

          <Inputan
            icon='fa fa-lock'
            name='password'
            type='password'
            placeholder='Password'
            innerRef={register({ required: true, minLength: 1 })}
            error={<ErrorMessage error={errors.password} />}
          />

          <Row>
            <Col xs='12'>
              <Button className='btn btn-primary' block color='primary'>
                <font className={`${FontButton}`} color='white'>
                  Login
                </font>
              </Button>
            </Col>
          </Row>

          <Row style={{ marginTop: '1.5em' }}>
            <Col xs='6' className='text-left'>
              <Link to='/forgetpassword' className='custom-link'>
                <span className={`${FontAnchorLupaPassword}`}>Lupa password?</span>
              </Link>
            </Col>
            <Col xs='6' className='text-right'>
              <Link to='/register' className='custom-link'>
                <span className='FontAnchorLupaRegister'>New? Registrasi</span>
              </Link>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
  return content
}

const RightCard = () => {
  const content = (
    <Card className='RightCard'>
      <CardBody>
        <div>
          {/* <LogoSVG width={260} height={250} viewBox='-10 0 400 370' /> */}
          {/* <LogoSVG width={280} height={150} /> */}
        </div>
      </CardBody>
    </Card>
  )
  return content
}

const BottomTitle = () => {
  const { BottomPaddingTop, BottomFont } = styles
  const content = (
    <div className={`text-center ${BottomPaddingTop}`}>
      <font className={`${BottomFont}`}>© {packageJson.description} [2019]</font>
    </div>
  )
  return content
}

export default Login
