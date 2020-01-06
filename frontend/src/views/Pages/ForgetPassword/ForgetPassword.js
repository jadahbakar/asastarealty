import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Form } from 'reactstrap'

import useForm from 'react-hook-form'
import { Inputan } from 'component'
import Swal from 'sweetalert2'
import axios from 'axios'

import { API_ROOT } from 'api'
import ErrorMessage from './errorMessage'

const ForgetPassword = props => {
  const { useForm, errors, register, handleSubmit } = useForm()

  // --------------------------------------- A L E R T
  const hideAlert = () => {
    props.history.push('/login')
  }

  const showAlert = (kind, title, message) => {
    Swal.fire({
      type: kind,
      title,
      text: message,
      // timer: 1000,
      footer: '@asastarealty'
    }).then(result => {
      hideAlert()
    })
  }

  // --------------------------------------- S U B M I T
  const onSubmit = data => {
    const backEndForget = `${API_ROOT}/forgetpassword`
    axios
      .post(`${backEndForget}`, {
        action: 'i',
        status: 0,
        user: data.userId,
        jenis: '1'
      })
      .then(response => {
        const status = response.data[0].activity_wud
        switch (status) {
          case 'success':
            showAlert('success', 'Success', 'Silahkan menghubungi Admin...')
            break
          case 'usernotfound':
            showAlert('error', '', 'Maaf User Tidak Ditemukan...')
            break
          case 'reqfound':
            showAlert('error', '', 'User Sudah Terdaftar...')
            break
          default:
          // console.log(status)
        }
      })
      .catch(error => {
        if (error) {
          showAlert('error', 'Error', 'message: Too Many Request')
        }
      })
  }

  const content = (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='10' lg='10' xl='6' style={{ flexBasis: 'auto' }}>
            <Card className='mx-4'>
              <CardHeader>
                <h1>Lupa Password</h1>
                <p className='text-muted'>Silahkan Input User ID...</p>
              </CardHeader>
              <CardBody>
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
                  <Button block size='lg' color='warning'>
                    <font color='white' fontWeight='bold'>
                      R e s e t
                    </font>
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )

  return content
}

export default ForgetPassword
