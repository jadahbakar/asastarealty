/* global sessionStorage */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Row, Form } from 'reactstrap'
// eslint-disable-next-line no-unused-vars
import { Inputan, useHttp, LogoSVG } from 'component'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { API_ROOT } from 'api'
import ErrorMessage from './errorMessage'
import packageJson from '../../../../package.json'

const radius = '10px'
const CryptoJS = require('crypto-js')

const backEndLogin = `${API_ROOT}/login`

const styles = {
  CardStyleMouseEnter: {
    boxShadow: '#0000005c 0px 10px 28px',
    borderRadius: radius
  },
  CardStyleMouseLeave: { boxShadow: '#ccc 0px 1px 2px', borderRadius: radius },
  FontButton: { fontSize: '1.2em' },
  FontAnchorLupaPassword: { color: '#f86c6b', fontSize: '1.em' },
  FontAnchorLupaRegister: { color: '#387847', fontSize: '1.em' },
  LeftCard: {
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius
  },
  RightCard: {
    width: `${44}%`,
    background: '#1b486b',
    borderBottomRightRadius: radius,
    borderTopRightRadius: radius
  },
  BottomPaddingTop: { paddingTop: 15 },
  BottomFont: { color: '#347dc9' }
}

const encrypt = (msg, pass) => {
  const keySize = 256
  const iterations = 100
  const salt = CryptoJS.lib.WordArray.random(128 / 8)

  const key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations
  })

  const iv = CryptoJS.lib.WordArray.random(128 / 8)

  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  })

  const transitmessage = salt.toString() + iv.toString() + encrypted.toString()
  return transitmessage
}

const Login = () => {
  const { CardStyleMouseEnter, CardStyleMouseLeave } = styles
  const [hover, setHover] = useState(false)

  const mouseLeave = () => {
    setHover(false)
  }
  const mouseEnter = () => {
    setHover(true)
  }

  const login = (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='8'>
            <CardGroup onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={hover ? CardStyleMouseEnter : CardStyleMouseLeave}>
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
  const { LeftCard, FontButton, FontAnchorLupaPassword, FontAnchorLupaRegister } = styles
  const { errors, register, handleSubmit } = useForm()
  // const [search, setSearch] = useState('');
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [url, setUrl] = useState(`${backEndLogin}`)
  const [tokenLogin, setTokenLogin] = useState([])
  // const inputRef = useRef();

  const hideAlert = () => {
    setUserId('')
    setPassword('')
    fetchData()
  }

  // ------------works
  // const [tokenLogin] = useHttp(`${backEndLogin}`, '', []);
  // --------------------------------------- S U B M I T

  const fetchData = async () => {
    const result = await axios(`${backEndLogin}`)
    setTokenLogin(result.data.token)
    // console.log(result.data.token)
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
          Swal.fire({
            type: 'warning',
            title: '',
            text: 'Maaf User Anda Tidak Aktif...\n Silahkan Menghubungi Admin...',
            timer: 2000,
            footer: packageJson.description
          }).then(result => {
            hideAlert()
          })
        }
      })
      .catch(error => {
        Swal.fire({
          type: 'error',
          title: 'Maaf Terdapat Kegagalan',
          text: `[${error.response.status}] ${error.response.data.message}`,
          timer: 2000,
          footer: packageJson.description
        }).then(result => {
          hideAlert()
        })
      })
  }

  const content = (
    <Card
      className='p-4'
      style={LeftCard}
    >
      <CardBody>
        <h1>Login</h1>
        <p className='text-muted'>Sign In to your account</p>
        <br />
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <Form> */}
          <Inputan
            icon='fa fa-user'
            name='userId'
            type='text'
            value={userId}
            change={e => setUserId(e.target.value)}
            placeholder='User ID'
            focus
            innerRef={register({ required: true, minLength: 3 })}
            error={<ErrorMessage error={errors.userId} />}
          />

          <Inputan
            icon='fa fa-lock'
            name='password'
            type='password'
            value={password}
            change={e => setPassword(e.target.value)}
            placeholder='Password'
            innerRef={register({ required: true, minLength: 1 })}
            error={<ErrorMessage error={errors.password} />}
          />

          <Row>
            <Col xs='12'>
              <Button className='btn btn-primary' block color='primary'>
                <font color='white' style={FontButton}>
                  Login
                </font>
              </Button>
            </Col>
          </Row>

          <Row style={{ marginTop: '1.5em' }}>
            <Col xs='6' className='text-left'>
              <Link to='/forgetpassword'>
                <a>
                  <span style={FontAnchorLupaPassword}>Lupa password?</span>
                </a>
              </Link>
            </Col>
            <Col xs='6' className='text-right'>
              <Link to='/register'>
                <a>
                  <span style={FontAnchorLupaRegister}>New? Registrasi</span>
                </a>
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
  const { RightCard } = styles
  const content = (
    <Card
      className='text-white py-5 d-md-down-none'
      style={RightCard}
    >
      <CardBody className='text-center'>
        <div>
          {/* <LogoSVG width={300} height={290} viewBox="-10 0 400 370" /> */}
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
    <div className='text-center' style={BottomPaddingTop}>
      <font style={BottomFont}>© {packageJson.description} [2019]</font>
    </div>
  )
  return content
}

export default Login
