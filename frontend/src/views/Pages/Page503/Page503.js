import React from 'react'
import { Col, Container, Row, Button } from 'reactstrap'

const Page503 = () => {
  const clickButton = () => {
    window.location.href = '/login'
  }

  const context = (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='6'>
            <span className='clearfix'>
              <h1 className='float-left display-3 mr-4'>503</h1>
              <h4 className='pt-3'>Maaf, Ada masalah dengan Server !</h4>
              <p className='text-muted float-left'>Silahkan kembali ke Halaman sebelumnya.</p>
            </span>
            <div>
              <Button color='primary' onClick={clickButton}>
                Back To Home
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )

  return context
}

export default Page503
