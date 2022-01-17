/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useRef, useEffect } from 'react'
import { Button, Card, Input, CardHeader, CardBody, CardFooter, Col, Container, Row, Label, Form } from 'reactstrap'
import { Inputan, InputanPassword, InputanSelect, useHttp, MyAlert, useFetch } from 'component'
import PropTypes from 'prop-types'
import axios from 'axios'
import { API_ROOT } from 'api'
import { useForm } from 'react-hook-form'
import ErrorMessage from './errorMessage'
import { encrypt } from 'utils'
import styles from './register.css'
import { scroller } from 'react-scroll'
import registerReducer, { initialState, FIELD, CLEAR, CHECKED, UNCHECKED, PROPINSI_SELECT, INPUT_NUMBER } from './Register.reducer'

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

const Register = props => {
  const backEndMaster = `${API_ROOT}/master`
  const backEndRegister = `${API_ROOT}/registrasi`
  const { errors, register, handleSubmit } = useForm()

  const [state, dispatch] = useReducer(registerReducer, initialState)
  const {
    nama,
    tempatLahir,
    tanggalLahir,
    nik,
    kk,
    agama,
    hp,
    pekerjaan,
    statusNikah,
    alamat,
    propinsi,
    kota,
    kecamatan,
    kelurahan,
    rt,
    rw,
    kodePOS,
    alamatKTP,
    propinsiKTP,
    kotaKTP,
    kecamatanKTP,
    kelurahanKTP,
    rtKTP,
    rwKTP,
    kodePOSKTP,
    checkedSama,
    email,
    password
    // ,kotaList
  } = state

  // --------------------------------------- DidMount get Token
  // const [tokenRegister] = useHttp(`${backEndRegister}`, '', [])
  const [tokenRegister] = useFetch(`${backEndRegister}`, '')

  // --------------------------------------- PRIBADI
  // const [agamaList] = useHttp(`${backEndMaster}/agama`, '', [])
  const [agamaList] = useFetch(`${backEndMaster}/agama`, '')

  // const [statusNikahList] = useHttp(`${backEndMaster}/marital`, '', [])
  const [statusNikahList] = useFetch(`${backEndMaster}/marital`, '')

  // --------------------------------------- TEMPAT TINGGAL
  // const [propinsiList] = useHttp(`${backEndMaster}/propinsi`, '', [])
  // const [kotaList] = useHttp(`${backEndMaster}/kota/${propinsi}`, '', [propinsi])
  // const [kecamatanList] = useHttp(`${backEndMaster}/kecamatan/${kota}`, '', [kota])
  // const [KelurahanList] = useHttp(`${backEndMaster}/kelurahan/${kecamatan}`, '', [kecamatan])

  const [propinsiList] = useFetch(`${backEndMaster}/propinsi`, '')
  const [kotaList] = useFetch(`${backEndMaster}/kota/${propinsi}`, '')
  const [kecamatanList] = useFetch(`${backEndMaster}/kecamatan/${kota}`, '')
  const [KelurahanList] = useFetch(`${backEndMaster}/kelurahan/${kecamatan}`, '')

  const propinsiSelectHandler = e => {
    kecamatanList.length = 0
    KelurahanList.length = 0
    dispatch({
      type: PROPINSI_SELECT,
      fieldName: 'propinsi',
      payload: e.currentTarget.value
    })
  }

  const kotaSelectHandler = e => {
    KelurahanList.length = 0
    dispatch({
      type: FIELD,
      fieldName: 'kota',
      payload: e.currentTarget.value
    })
  }

  const kecamatanSelectHandler = e => {
    dispatch({
      type: FIELD,
      fieldName: 'kecamatan',
      payload: e.currentTarget.value
    })
  }

  const kelurahanSelectHandler = e => {
    dispatch({
      type: FIELD,
      fieldName: 'kelurahan',
      payload: e.currentTarget.value
    })
  }

  // --------------------------------------- KTP
  // const [propinsiKTPList] = useHttp(`${backEndMaster}/propinsi`, '', [])
  // const [kotaKTPList] = useHttp(`${backEndMaster}/kota/${propinsiKTP}`, '', [propinsiKTP])
  // const [kecamatanKTPList] = useHttp(`${backEndMaster}/kecamatan/${kotaKTP}`, '', [kotaKTP])
  // const [KelurahanKTPList] = useHttp(`${backEndMaster}/kelurahan/${kecamatanKTP}`, '', [kecamatanKTP])

  const [propinsiKTPList] = useFetch(`${backEndMaster}/propinsi`, '')
  const [kotaKTPList] = useFetch(`${backEndMaster}/kota/${propinsi}`, '')
  const [kecamatanKTPList] = useFetch(`${backEndMaster}/kecamatan/${kota}`, '')
  const [KelurahanKTPList] = useFetch(`${backEndMaster}/kelurahan/${kecamatan}`, '')

  const propinsiKTPSelectHandler = e => {
    kecamatanKTPList.length = 0
    KelurahanKTPList.length = 0
    dispatch({
      type: FIELD,
      fieldName: 'propinsiKTP',
      payload: e.currentTarget.value
    })
  }

  const kotaKTPSelectHandler = e => {
    KelurahanKTPList.length = 0
    dispatch({
      type: FIELD,
      fieldName: 'kotaKTP',
      payload: e.currentTarget.value
    })
  }

  const kecamatanKTPSelectHandler = e => {
    dispatch({
      type: FIELD,
      fieldName: 'kecamatanKTP',
      payload: e.currentTarget.value
    })
  }

  const kelurahanKTPSelectHandler = e => {
    dispatch({
      type: FIELD,
      fieldName: 'kelurahanKTP',
      payload: e.currentTarget.value
    })
  }

  // --------------------------------------- SAMA

  const handleChangeCheck = () => {
    if (!checkedSama) {
      scroller.scrollTo('myScrollToElement', {
        duration: 1500,
        delay: 57,
        smooth: true,
        offset: -10
      })
      dispatch({ type: CHECKED })
    } else {
      dispatch({ type: UNCHECKED })
    }
  }

  // --------------------------------------- ALERT

  const hideAlert = () => {
    dispatch({ type: 'clear' })
    props.history.push('/')
  }

  // --------------------------------------- SUBMIT
  const cleanIt = string => {
    const regexUnderscore = new RegExp('_', 'g') // indicates global match
    const regexHash = new RegExp(' ', 'g')
    return string.replace(regexHash, '').replace(regexUnderscore, '')
  }

  const onSubmit = data => {
    const hashString = encrypt(password, tokenRegister.token)

    const objPribadi = {
      tempatLahir: tempatLahir.toUpperCase(),
      tanggalLahir,
      nik: cleanIt(nik),
      kk: cleanIt(kk),
      hp: cleanIt(hp),
      pekerjaan: pekerjaan.toUpperCase(),
      agama,
      statusNikah
    }
    const objTempatTinggal = {
      alamat: alamat.toUpperCase(),
      propinsi,
      kota,
      kecamatan,
      kelurahan,
      rt,
      rw,
      kodePOS
    }
    const objTempatTinggalKTP = {
      alamatKTP: alamatKTP.toUpperCase(),
      propinsiKTP,
      kotaKTP,
      kecamatanKTP,
      kelurahanKTP,
      rtKTP,
      rwKTP,
      kodePOSKTP
    }
    axios.defaults.headers.common.Authorization = tokenRegister.token
    axios
      .post(`${backEndRegister}`, {
        regNama: nama,
        regPribadi: JSON.stringify(objPribadi),
        regAlamat: JSON.stringify(objTempatTinggal),
        regAlamatKtp: JSON.stringify(objTempatTinggalKTP),
        regEmail: email,
        regPassword: hashString
      })
      .then(response => {
        // console.log('TCL: response ->', response)
        if (response.data.status === 'success') {
          MyAlert('success', 'Success', `UserId Anda : <font size: "15px" color:"#17171f"> ${response.data.message} </font>`, 10000, hideAlert)
        } else {
          MyAlert('error', 'Gagal Simpan Data', `<font size: "15px" color:"#17171f"> ${response.data.message} </font>`, 10000, hideAlert)
        }
      })
      .catch(error => {
        MyAlert('error', 'Gagal Menyimpan', error, 50000, hideAlert)
      })
  }

  const content = (
    <>
      <Container fluid>
        <Row className='justify-content-center'>
          <Col md='10' lg='10' xl='6' style={{ flexBasis: 'auto' }}>
            <Card className='mx-4'>
              <CardHeader>
                <h1>Registrasi</h1>
                <p className='text-muted'>Membuat Akun...</p>
              </CardHeader>

              <CardBody className='p-4'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Inputan
                    icon='fa fa-lock'
                    name='nama'
                    type='text'
                    value={nama}
                    change={e =>
                      dispatch({
                        type: FIELD,
                        fieldName: 'nama',
                        payload: e.target.value
                      })}
                    placeholder='Nama'
                    innerRef={register({ required: true, minLength: 3 })}
                    error={<ErrorMessage error={errors.nama} />}
                  />
                  <Label htmlFor='prependedInput' className='register-label-header'>
                    Data Pribadi
                  </Label>
                  <ColoredLine color='#ff9375' />
                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Inputan
                        icon='fa fa-home'
                        name='tempatLahir'
                        type='text'
                        value={tempatLahir}
                        change={e =>
                          dispatch({
                            type: FIELD,
                            fieldName: 'tempatLahir',
                            payload: e.target.value
                          })}
                        placeholder='Tempat Lahir'
                        innerRef={register({ required: true, minLength: 3 })}
                        error={<ErrorMessage error={errors.tempatLahir} />}
                      />
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Inputan
                        icon='fa fa-calendar'
                        name='tanggalLahir'
                        type='date'
                        value={tanggalLahir}
                        change={e =>
                          dispatch({
                            type: FIELD,
                            fieldName: 'tanggalLahir',
                            payload: e.target.value
                          })}
                        placeholder='Tanggal Lahir'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.tanggalLahir} />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Inputan
                        icon='fa fa-id-card-o'
                        name='nik'
                        type='text'
                        value={nik}
                        change={e =>
                          dispatch({
                            type: INPUT_NUMBER,
                            fieldName: 'nik',
                            payload: e.target.value
                          })}
                        placeholder='NIK'

                        innerRef={register({
                          required: true,
                          minLength: 16,
                          maxLength: 16
                        })}
                        error={<ErrorMessage error={errors.nik} />}
                      />
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Inputan
                        icon='fa fa-id-card-o'
                        name='kk'
                        type='text'
                        value={kk}
                        change={e =>
                          dispatch({
                            type: INPUT_NUMBER,
                            fieldName: 'kk',
                            payload: e.target.value
                          })}
                        placeholder='No KK'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.kk} />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Inputan
                        icon='icon-phone'
                        name='hp'
                        type='text'
                        value={hp}
                        change={e =>
                          dispatch({
                            type: INPUT_NUMBER,
                            fieldName: 'hp',
                            payload: e.target.value
                          })}
                        placeholder='No HP'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.hp} />}
                      />
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Inputan
                        icon='icon-layers'
                        name='pekerjaan'
                        type='text'
                        value={pekerjaan}
                        change={e =>
                          dispatch({
                            type: FIELD,
                            fieldName: 'pekerjaan',
                            payload: e.target.value
                          })}
                        placeholder='Pekerjaan'
                        feedback='Pekerjaan Harus Di Isi'
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='fa fa-hand-pointer-o'
                        name='agama'
                        value={agama}
                        change={e =>
                          dispatch({
                            type: FIELD,
                            fieldName: 'agama',
                            payload: e.target.value
                          })}
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.agama} />}
                      >
                        <option key='' value=''>
                          Pilih Agama...
                        </option>
                        {agamaList.map(detail => (
                          <option key={detail.agama_id} value={detail.agama_id}>
                            {detail.agama_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='icon-tag'
                        name='statusNikah'
                        value={statusNikah}
                        change={e =>
                          dispatch({
                            type: FIELD,
                            fieldName: 'statusNikah',
                            payload: e.target.value
                          })}
                        placeholder='Pilih Agama'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.statusNikah} />}
                      >
                        <option key='' value=''>
                          Pilih Status...
                        </option>
                        {statusNikahList.map(detail => (
                          <option key={detail.marital_id} value={detail.marital_id}>
                            {detail.marital_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                  </Row>

                  {/* ----------------------------------- TEMPAT TINGGAL ----------------------------------- */}

                  <Label htmlFor='prependedInput' className='register-label-header' name='myScrollToElement'>
                    Tempat Tinggal
                  </Label>
                  <ColoredLine color='#ff9375' />

                  <Inputan
                    icon='fa fa-map-o'
                    name='alamat'
                    type='text'
                    value={alamat}
                    change={e =>
                      dispatch({
                        type: FIELD,
                        fieldName: 'alamat',
                        payload: e.target.value
                      })}
                    placeholder='Alamat'
                    innerRef={register({ required: true, minLength: 10 })}
                    error={<ErrorMessage error={errors.alamat} />}
                  />
                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='icon-tag'
                        name='propinsi'
                        value={propinsi}
                        change={propinsiSelectHandler}
                        placeholder='Propinsi'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.propinsi} />}
                      >
                        <option key='' value=''>
                          Pilih Propinsi...
                        </option>
                        {propinsiList.map(detail => (
                          <option key={detail.propinsi_id} value={detail.propinsi_id}>
                            {detail.propinsi_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='icon-tag'
                        name='kota'
                        value={kota}
                        change={kotaSelectHandler}
                        placeholder='Kota'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.kota} />}
                      >
                        <option key='' value=''>
                          Pilih Kota...
                        </option>
                        {kotaList.map(detail => (
                          <option key={detail.kota_id} value={detail.kota_id}>
                            {detail.kota_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='fa fa-map-pin'
                        name='kecamatan'
                        value={kecamatan}
                        change={kecamatanSelectHandler}
                        placeholder='Kecamatan'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.kecamatan} />}
                      >
                        <option key='' value=''>
                          Pilih Kecamatan...
                        </option>
                        {kecamatanList.map(detail => (
                          <option key={detail.kecamatan_id} value={detail.kecamatan_id}>
                            {detail.kecamatan_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='fa fa-map-pin'
                        name='kelurahan'
                        value={kelurahan}
                        change={kelurahanSelectHandler}
                        placeholder='Kelurahan'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.kelurahan} />}
                      >
                        <option key='' value=''>
                          Pilih Kelurahan...
                        </option>
                        {KelurahanList.map(detail => (
                          <option key={detail.kelurahan_id} value={detail.kelurahan_id}>
                            {detail.kelurahan_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Row>
                        <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                          <Inputan
                            icon='icon-directions'
                            name='rt'
                            type='text'
                            value={rt}
                            change={e =>
                              dispatch({
                                type: INPUT_NUMBER,
                                fieldName: 'rt',
                                payload: e.target.value
                              })}
                            placeholder='RT'
                            innerRef={register({ required: true })}
                            error={<ErrorMessage error={errors.rt} />}
                          />
                        </Col>
                        <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                          <Inputan
                            icon='icon-directions'
                            name='rw'
                            type='text'
                            value={rw}
                            change={e =>
                              dispatch({
                                type: INPUT_NUMBER,
                                fieldName: 'rw',
                                payload: e.target.value
                              })}
                            placeholder='RW'
                            innerRef={register({ required: true })}
                            error={<ErrorMessage error={errors.rw} />}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Inputan
                        icon='icon-direction'
                        name='kodePOS'
                        type='text'
                        value={kodePOS}
                        change={e =>
                          dispatch({
                            type: INPUT_NUMBER,
                            fieldName: 'kodePOS',
                            payload: e.target.value
                          })}
                        placeholder='Kode POS'
                        innerRef={register({
                          required: true,
                          minLength: 5,
                          maxLength: 5
                        })}
                        error={<ErrorMessage error={errors.kodePOS} />}
                      />
                    </Col>
                  </Row>

                  {/* ----------------------------------- KTP ----------------------------------- */}

                  <Row>
                    <Col>
                      <Label htmlFor='prependedInput' className='register-label-header'>
                        Alamat Sesuai KTP
                      </Label>
                    </Col>
                    <Col>

                      <div className='ks-cboxtags'>
                        <input type='checkbox' id='checkbox' value={checkedSama} onChange={handleChangeCheck} />
                        <label htmlFor='checkbox'>Sama Seperti Diatas</label>
                      </div>
                    </Col>
                  </Row>
                  <ColoredLine color='#ff9375' />

                  <Inputan
                    icon='fa fa-map-o'
                    name='alamatKTP'
                    type='text'
                    value={alamatKTP}
                    change={e =>
                      dispatch({
                        type: FIELD,
                        fieldName: 'alamatKTP',
                        payload: e.target.value
                      })}
                    placeholder='Alamat'
                    innerRef={register({ required: true, minLength: 10 })}
                    error={<ErrorMessage error={errors.alamatKTP} />}
                  />
                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='icon-tag'
                        name='propinsiKTP'
                        value={propinsiKTP}
                        change={propinsiKTPSelectHandler}
                        placeholder='Propinsi'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.propinsiKTP} />}
                      >
                        <option key='' value=''>
                          Pilih Propinsi...
                        </option>
                        {propinsiKTPList.map(detail => (
                          <option key={detail.propinsi_id} value={detail.propinsi_id}>
                            {detail.propinsi_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='icon-tag'
                        name='kotaKTP'
                        value={kotaKTP}
                        change={kotaKTPSelectHandler}
                        placeholder='Kota'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.kotaKTP} />}
                      >
                        <option key='' value=''>
                          Pilih Kota...
                        </option>
                        {kotaKTPList.map(detail => (
                          <option key={detail.kota_id} value={detail.kota_id}>
                            {detail.kota_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='fa fa-map-pin'
                        name='kecamatanKTP'
                        value={kecamatanKTP}
                        change={kecamatanKTPSelectHandler}
                        placeholder='Kecamatan'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.kecamatanKTP} />}
                      >
                        <option key='' value=''>
                          Pilih Kecamatan...
                        </option>
                        {kecamatanKTPList.map(detail => (
                          <option key={detail.kecamatan_id} value={detail.kecamatan_id}>
                            {detail.kecamatan_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <InputanSelect
                        icon='fa fa-map-pin'
                        name='kelurahanKTP'
                        value={kelurahanKTP}
                        change={kelurahanKTPSelectHandler}
                        placeholder='Kelurahan'
                        innerRef={register({ required: true })}
                        error={<ErrorMessage error={errors.kelurahanKTP} />}
                      >
                        <option key='' value=''>
                          Pilih Kelurahan...
                        </option>
                        {KelurahanKTPList.map(detail => (
                          <option key={detail.kelurahan_id} value={detail.kelurahan_id}>
                            {detail.kelurahan_nama}
                          </option>
                        ))}
                      </InputanSelect>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Row>
                        <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                          <Inputan
                            icon='icon-directions'
                            name='rtKTP'
                            type='text'
                            value={rtKTP}
                            change={e =>
                              dispatch({
                                type: INPUT_NUMBER,
                                fieldName: 'rtKTP',
                                payload: e.target.value
                              })}

                            placeholder='RT'
                            innerRef={register({ required: true })}
                            error={<ErrorMessage error={errors.rtKTP} />}
                          />
                        </Col>
                        <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                          <Inputan
                            icon='icon-directions'
                            name='rwKTP'
                            type='text'
                            value={rwKTP}
                            change={e =>
                              dispatch({
                                type: INPUT_NUMBER,
                                fieldName: 'rwKTP',
                                payload: e.target.value
                              })}
                            placeholder='RW'
                            innerRef={register({ required: true })}
                            error={<ErrorMessage error={errors.rwKTP} />}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md='6' lg='6' xl='6' sm='auto' xs='auto'>
                      <Inputan
                        icon='icon-direction'
                        name='kodePOSKTP'
                        type='text'
                        value={kodePOSKTP}
                        change={e =>
                          dispatch({
                            type: INPUT_NUMBER,
                            fieldName: 'kodePOSKTP',
                            payload: e.target.value
                          })}
                        placeholder='Kode POS'
                        innerRef={register({
                          required: true,
                          minLength: 5,
                          maxLength: 5
                        })}
                        error={<ErrorMessage error={errors.kodePOSKTP} />}
                      />
                    </Col>
                  </Row>

                  {/* ----------------------------------- PRIVASI ----------------------------------- */}
                  <Label htmlFor='prependedInput' className='register-label-header'>
                    Privasi
                  </Label>
                  <ColoredLine color='#ff9375' />
                  <Inputan
                    icon='icon-envelope'
                    name='email'
                    type='text'
                    value={email}
                    change={e =>
                      dispatch({
                        type: FIELD,
                        fieldName: 'email',
                        payload: e.target.value
                      })}
                    placeholder='email'
                    innerRef={register({
                      required: true,
                      pattern: /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/i
                    })}
                    error={<ErrorMessage error={errors.email} />}
                  />
                  <InputanPassword
                    icon='icon-lock'
                    name='password'
                    value={password}
                    change={e =>
                      dispatch({
                        type: FIELD,
                        fieldName: 'password',
                        payload: e.target.value
                      })}
                    placeholder='Password'
                    innerRef={register({
                      required: true
                    })}
                    error={<ErrorMessage error={errors.password} />}
                  />

                  <Button color='success' block size='lg'>
                    Create Account
                  </Button>
                </Form>
              </CardBody>
              <CardFooter className='text-center'>
                <Label htmlFor='prependedInput'>Pastikan data yang di Input sudah Benar.</Label>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )

  return content
}

export default Register
