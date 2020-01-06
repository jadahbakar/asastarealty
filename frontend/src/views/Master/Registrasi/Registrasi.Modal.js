/* global sessionStorage */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col, Row, Form } from 'reactstrap'
import { Labelku, Inputan, useHttp } from 'component'
import Swal from 'sweetalert2'
import ErrorMessage from './errorMessage'
import { RegistrasiContext } from './Registrasi.Context'

const styles = {
  titleStyle: {
    marginTop: '0.5em',
    marginBottom: '0.3em',
    fontWeight: 600,
    fontSize: '1.063em'
  },
  ReferalStyle: {
    marginTop: '0.5em',
    marginBottom: '0.3em',
    fontSize: '1.5em',
    fontStyle: 'bold'
  }

}
const ModalReg = () => {
  const context = useContext(RegistrasiContext)
  const content = (
    <>
      <Modal isOpen={context.modalOpen} toggle={context.toggleOpen} className='modal-primary modal-lg'>
        <Header toggle={context.toggleOpen} title={context.titleMenu} />
        <Body />
      </Modal>
    </>
  )
  return content
}

const Body = () => {
  const { titleStyle, ReferalStyle } = styles
  const { errors, register, handleSubmit } = useForm()

  const context = useContext(RegistrasiContext)

  // --------------------------------------- GET DATA
  const [fetchDetail] = useHttp(`${context.backEndReg}/detail/${context.regID}`, sessionStorage.getItem('tkn'), [])

  // --------------------------------------- A L E R T
  const hideAlert = () => {
    context.reloadTableData()
    context.toggleOpen()
  }
  // --------------------------------------- S U B M I T
  const onSubmit = data => {
    axios.defaults.headers.common.Authorization = sessionStorage.getItem('tkn')
    axios
      .post(`${context.backEndReg}/detail`, {
        regID: context.regID,
        regReferal: data.referalID
      })
      .then(response => {
        const { status, message } = response.data
        // console.log('TCL: Body -> response', response.data.status)
        // console.log('TCL: Body -> status', status)

        if (status !== 'success') {
          Swal.fire({
            type: status,
            title: status,
            text: message,
            timer: 3000,
            footer: '@asastarealty'
          }).then(result => {
            hideAlert()
          })
        } else {
          Swal.fire({
            type: status,
            title: status,
            // text: 'User Sudah Ter-Approve',
            text: message,
            timer: 3000,
            footer: '@asastarealty'
          }).then(result => {
            hideAlert()
          })
        }
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: error.response,
          timer: 1000,
          footer: '@asastarealty'
        }).then(result => {
          hideAlert()
        })
      })
  }

  let content = (
    <>
      <ModalBody />
    </>
  )

  if (fetchDetail && fetchDetail.length > 0) {
    const data = fetchDetail[0]
    content = (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Labelku index='reg_id' title='Registrasi ID' value={data.reg_id} />
            <Labelku index='reg_nama' title='NAMA' value={data.reg_nama} />

            <Labelku index='reg_email' title='email' value={data.reg_email} />

            <Labelku index='reg_date' title='Tgl Pendaftaran' value={data.reg_date} />

            <Label
              htmlFor='prependedInput'
              style={titleStyle}
            >
              Data Pribadi
            </Label>
            <ColoredLine color='#ff9375' />

            <Row>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='tempatlahir' title='Tempat Lahir' value={data.tempatlahir} />
              </Col>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='tanggallahir' title='Tgl Lahir' value={data.tanggallahir} />
              </Col>
            </Row>

            <Row>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='nik' title='NIK' value={data.nik} />
              </Col>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='kk' title='KK' value={data.kk} />
              </Col>
            </Row>

            <Row>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='nohp' title='No HP' value={data.nohp} />
              </Col>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='pekerjaan' title='Pekerjaan' value={data.pekerjaan} />
              </Col>
            </Row>
            <Row>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='agama_nama' title='Agama' value={data.agama_nama} />
              </Col>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='statusnikah_nama' title='Status' value={data.statusnikah_nama} />
              </Col>
            </Row>

            <Label htmlFor='prependedInput' style={titleStyle}>
              Tempat Tinggal
            </Label>
            <ColoredLine color='#ff9375' />
            <Labelku index='alamat' title='Alamat' value={data.alamat} />
            <Row>
              <Col md='3' lg='3' xl='3' sm='auto' xs='auto'>
                <Labelku index='rt' title='RT' value={data.rt} />
              </Col>
              <Col md='3' lg='3' xl='3' sm='auto' xs='auto'>
                <Labelku index='rw' title='RW' value={data.rw} />
              </Col>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='kodepos' title='Kode POS' value={data.kodepos} />
              </Col>
            </Row>

            <Labelku index='keluarahan_nama' title='Kelurahan' value={data.keluarahan_nama} />
            <Labelku index='kecamatan_nama' title='Kecamatan' value={data.kecamatan_nama} />
            <Labelku index='kota_nama' title='Kota' value={data.kota_nama} />
            <Labelku index='propinsi_nama' title='Propinsi' value={data.propinsi_nama} />
            <Label htmlFor='prependedInput' style={titleStyle}>
              Alamat Sesuai KTP
            </Label>
            <ColoredLine color='#ff9375' />
            <Labelku index='alamatktp' title='Alamat' value={data.alamatktp} />
            <Row>
              <Col md='3' lg='3' xl='3' sm='auto' xs='auto'>
                <Labelku index='rtktp' title='RT' value={data.rtktp} />
              </Col>
              <Col md='3' lg='3' xl='3' sm='auto' xs='auto'>
                <Labelku index='rwktp' title='RW' value={data.rwktp} />
              </Col>
              <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                <Labelku index='kodeposktp' title='Kode POS' value={data.kodeposktp} />
              </Col>
            </Row>

            <Labelku index='keluarahanktp_nama' title='Kelurahan' value={data.keluarahanktp_nama} />
            <Labelku index='kecamatanktp_nama' title='Kecamatan' value={data.kecamatanktp_nama} />
            <Labelku index='kotaktp_nama' title='Kota' value={data.kotaktp_nama} />
            <Labelku index='propinsiktp_nama' title='Propinsi' value={data.propinsiktp_nama} />

            <Label
              htmlFor='prependedInput'
              style={ReferalStyle}
            >
              [ Referal ]
            </Label>
            <ColoredLine color='#ff9375' />

            <Inputan
              icon='fa fa-lock'
              name='referalID'
              type='text'
              placeholder='Referal ID'
              innerRef={register({
                required: true,
                minLength: 3,
                pattern: /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/i
              })}
              error={<ErrorMessage error={errors.referalID} />}
            />
          </ModalBody>
          <Footer />
        </Form>
      </>
    )
  }

  return content
}

const Header = props => {
  const content = (
    <>
      <ModalHeader toggle={props.toggle}>
        <i className='fa fa-gears fa-lg' />
        {' '}
&nbsp;Detail
        {props.title}
      </ModalHeader>
    </>
  )
  return content
}

const Footer = () => {
  const content = (
    <>
      <ModalFooter>
        <Button color='danger' size='lg' className='mr-auto'>
          <i className='fa fa-trash-o' />
          &nbsp;Delete
        </Button>

        <Button color='success' size='lg'>
          <i className='fa fa-save' />
          &nbsp;&nbsp;Save
        </Button>
      </ModalFooter>
    </>
  )
  return content
}

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 0.3,
      marginTop: 0,
      marginBottom: '0.9em'
    }}
  />
)

ColoredLine.propTypes = {
  color: PropTypes.string.isRequired
}

export default ModalReg
