/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Card, Input, CardHeader, CardBody, CardFooter, Col, Container, Row, Label, Form } from 'reactstrap'
import { Inputan, InputanPassword, InputanSelect, useHttp } from 'component'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import axios from 'axios'
import { API_ROOT } from 'api'
import useForm from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import ErrorMessage from './errorMessage'

const CryptoJS = require('crypto-js')

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

const Register = props => {
  const backEndMaster = `${API_ROOT}/master`
  const backEndRegister = `${API_ROOT}/registrasi`

  // const [nama, setNama] = useState('');
  // const [tempatLahir, setTempatLahir] = useState('');
  // const [tanggalLahir, setTanggalLahir] = useState('');
  // const [nik, setNIK] = useState('');
  // const [kk, setKK] = useState('');
  // const [agama, setAgama] = useState();
  // const [hp, setHP] = useState('');
  // const [pekerjaan, setPekerjaan] = useState('');
  // const [statusNikah, setStatusNikah] = useState('');

  // const [alamat, setAlamat] = useState('');
  // const [propinsi, setPropinsi] = useState('');
  // const [kota, setKota] = useState('');
  // const [kecamatan, setKecamatan] = useState('');
  // const [kelurahan, setKelurahan] = useState('');
  // const [rt, setRT] = useState('');
  // const [rw, setRW] = useState('');
  // const [kodePOS, setKodePOS] = useState('');

  // const [alamatKTP, setAlamatKTP] = useState('');
  // const [propinsiKTP, setPropinsiKTP] = useState('');
  // const [kotaKTP, setKotaKTP] = useState('');
  // const [kecamatanKTP, setKecamatanKTP] = useState('');
  // const [kelurahanKTP, setKelurahanKTP] = useState('');
  // const [rtKTP, setRTKTP] = useState('');
  // const [rwKTP, setRWKTP] = useState('');
  // const [kodePOSKTP, setKodePOSKTP] = useState('');
  // const [checkedSama, setCheckedSama] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setconfirmPassword] = useState('');

  const [nama, setNama] = useState('Aninditya Qameela Sauqiya')
  const [tempatLahir, setTempatLahir] = useState('Semarang')
  const [tanggalLahir, setTanggalLahir] = useState('2014-04-19')
  const [nik, setNIK] = useState('3374033012810001')
  const [kk, setKK] = useState('3374033012810001')
  const [agama, setAgama] = useState('1')
  const [hp, setHP] = useState('08121557997')
  const [pekerjaan, setPekerjaan] = useState('Wirausaha')
  const [statusNikah, setStatusNikah] = useState('1')

  const [alamat, setAlamat] = useState('Semarang Timur')
  const [propinsi, setPropinsi] = useState('33')
  const [kota, setKota] = useState('3374')
  const [kecamatan, setKecamatan] = useState('3374080')
  const [kelurahan, setKelurahan] = useState('3374080006')
  const [rt, setRT] = useState('05')
  const [rw, setRW] = useState('03')
  const [kodePOS, setKodePOS] = useState('50195')

  const [alamatKTP, setAlamatKTP] = useState('Semarang Timur')
  const [propinsiKTP, setPropinsiKTP] = useState('33')
  const [kotaKTP, setKotaKTP] = useState('3374')
  const [kecamatanKTP, setKecamatanKTP] = useState('3374080')
  const [kelurahanKTP, setKelurahanKTP] = useState('3374080006')
  const [rtKTP, setRTKTP] = useState('08')
  const [rwKTP, setRWKTP] = useState('09')
  const [kodePOSKTP, setKodePOSKTP] = useState('50198')
  const [checkedSama, setCheckedSama] = useState(false)
  const [email, setEmail] = useState('dedy@gmail.com')
  const [password, setPassword] = useState('asdfghjkl')
  // const [confirmPassword, setconfirmPassword] = useState('asdfghjkl');

  const { errors, register, handleSubmit } = useForm()

  const clearForm = () => {
    setNama('')
    setTempatLahir('')
    setTanggalLahir('')
    setNIK('')
    setKK('')
    setAgama()
    setHP('')
    setPekerjaan('')
    setStatusNikah('')
    setAlamat('')
    setPropinsi('')
    setKota('')
    setRT('')
    setRW('')
    setKelurahan('')
    setKecamatan('')
    setKodePOS('')
    setAlamatKTP('')
    setPropinsiKTP('')
    setKotaKTP('')
    setRTKTP('')
    setRWKTP('')
    setKelurahanKTP('')
    setKecamatanKTP('')
    setKodePOSKTP('')
    setEmail('')
    setPassword('')
    // setconfirmPassword('');
  }
  // --------------------------------------- DidMount get Token
  const [tokenRegister] = useHttp(`${backEndRegister}`, '')

  // --------------------------------------- Only Number
  const filterNonDigits = value => (value ? value.replace(/\D+/, '') : '')

  // --------------------------------------- P R I B A D I
  const [agamaList] = useHttp(`${backEndMaster}/agama`, '')
  const [statusNikahList] = useHttp(`${backEndMaster}/marital`, '')

  // --------------------------------------- T E M P A T   T I N G G A L
  const [propinsiList] = useHttp(`${backEndMaster}/propinsi`, '')
  const [kotaList] = useHttp(`${backEndMaster}/kota/${propinsi}`, '')
  const [kecamatanList] = useHttp(`${backEndMaster}/kecamatan/${kota}`, '')
  const [KelurahanList] = useHttp(`${backEndMaster}/kelurahan/${kecamatan}`, '')

  const propinsiSelectHandler = e => {
    kecamatanList.length = 0
    KelurahanList.length = 0
    setPropinsi(e.target.value)
  }

  const kotaSelectHandler = e => {
    KelurahanList.length = 0
    setKota(e.target.value)
  }

  const kecamatanSelectHandler = e => {
    setKecamatan(e.target.value)
  }

  // --------------------------------------- K T P
  const [propinsiKTPList] = useHttp(`${backEndMaster}/propinsi`, '')
  const [kotaKTPList] = useHttp(`${backEndMaster}/kota/${propinsiKTP}`, '')
  const [kecamatanKTPList] = useHttp(`${backEndMaster}/kecamatan/${kotaKTP}`, '')
  const [KelurahanKTPList] = useHttp(`${backEndMaster}/kelurahan/${kecamatanKTP}`, '')

  const propinsiKTPSelectHandler = e => {
    kecamatanKTPList.length = 0
    KelurahanKTPList.length = 0
    setPropinsiKTP(e.target.value)
  }

  const kotaKTPSelectHandler = e => {
    KelurahanKTPList.length = 0
    setKotaKTP(e.target.value)
  }

  const kecamatanKTPSelectHandler = e => {
    setKecamatanKTP(e.target.value)
  }

  // --------------------------------------- S A M A
  const samaCopy = () => {
    setAlamatKTP(alamat)
    setPropinsiKTP(propinsi)
    setKotaKTP(kota)
    setKecamatanKTP(kecamatan)
    setKelurahanKTP(kelurahan)
    setRTKTP(rt)
    setRWKTP(rw)
    setKodePOSKTP(kodePOS)
  }

  const handleChangeChek = () => {
    setCheckedSama(!checkedSama)
    if (!checkedSama) {
      samaCopy()
    } else {
      setAlamatKTP('')
      setPropinsiKTP('')
      setKotaKTP('')
      setKecamatanKTP('')
      setKelurahanKTP('')
      setRTKTP('')
      setRWKTP('')
      setKodePOSKTP('')
    }
  }

  // --------------------------------------- A L E R T
  const renderRedirect = () => {
    return <Redirect to='/' />
  }

  const hideAlert = () => {
    clearForm()
    // renderRedirect();
    props.history.push('/')
  }

  // --------------------------------------- S U B M I T
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
        Swal.fire({
          type: 'success',
          title: 'Success',
          text: `UserId Anda : ${response.data}`,
          timer: 1000,
          footer: '@asastarealty'
        }).then(result => {
          hideAlert()
        })
      })
      .catch(error => {
        let keterangan = error.response.data
        if (error.response.data.includes('duplicate')) {
          keterangan = 'Data Sudah Ada'
        }
        Swal.fire({
          type: 'error',
          title: 'Gagal Menyiman',
          text: keterangan,
          timer: 1000,
          footer: '@asastarealty'
        }).then(result => {
          hideAlert()
        })
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
                    change={e => setNama(e.target.value)}
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
                        change={e => setTempatLahir(e.target.value)}
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
                        change={e => setTanggalLahir(e.target.value)}
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
                        change={e => setNIK(filterNonDigits(e.target.value))}
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
                        change={e => setKK(filterNonDigits(e.target.value))}
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
                        change={e => setHP(filterNonDigits(e.target.value))}
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
                        change={e => setPekerjaan(e.target.value)}
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
                        change={e => setAgama(e.target.value)}
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
                        change={e => setStatusNikah(e.target.value)}
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

                  {/* ----------------------------------- T E M P A T   T I N G G A L ----------------------------------- */}

                  <Label htmlFor='prependedInput' className='register-label-header'>
                    Tempat Tinggal
                  </Label>
                  <ColoredLine color='#ff9375' />

                  <Inputan
                    icon='fa fa-map-o'
                    name='alamat'
                    type='text'
                    value={alamat}
                    change={e => setAlamat(e.target.value)}
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
                        change={e => setKelurahan(e.target.value)}
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
                            change={e => setRT(filterNonDigits(e.target.value))}
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
                            change={e => setRW(filterNonDigits(e.target.value))}
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
                        change={e => setKodePOS(filterNonDigits(e.target.value))}
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

                  {/* ----------------------------------- K T P ----------------------------------- */}

                  <Row>
                    <Col>
                      <Label htmlFor='prependedInput' className='register-label-header'>
                        Alamat Sesuai KTP
                      </Label>
                    </Col>
                    <Col>
                      <div>
                        <div className='checkbox checkbox-primary checkbox-align-right'>
                          <Input name='checkSama' type='checkbox' value='option1' onChange={handleChangeChek} />
                          <Label for='checkbox2'>Sama Seperti Diatas</Label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <ColoredLine color='#ff9375' />

                  <Inputan
                    icon='fa fa-map-o'
                    name='alamatKTP'
                    type='text'
                    value={alamatKTP}
                    change={e => setAlamatKTP(e.target.value)}
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
                        change={e => setKelurahanKTP(e.target.value)}
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
                            change={e => setRTKTP(e.target.value)}
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
                            change={e => setRWKTP(e.target.value)}
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
                        change={e => setKodePOSKTP(filterNonDigits(e.target.value))}
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

                  {/* ----------------------------------- P R I V A S I ----------------------------------- */}
                  <Label htmlFor='prependedInput' className='register-label-header'>
                    Privasi
                  </Label>
                  <ColoredLine color='#ff9375' />
                  <Inputan
                    icon='icon-envelope'
                    name='email'
                    type='text'
                    value={email}
                    change={e => setEmail(e.target.value)}
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
                    change={e => setPassword(e.target.value)}
                    placeholder='Password'
                    innerRef={register({
                      required: true
                    })}
                    error={<ErrorMessage error={errors.password} />}
                  />
                  {/* <InputanPassword
                    icon="icon-lock"
                    name="confirmPassword"
                    value={confirmPassword}
                    change={e => setconfirmPassword(e.target.value)}
                    placeholder="Tulis Ulang Password"
                    innerRef={register({
                      required: true
                    })}
                    error={<ErrorMessage error={errors.confirmPassword} />}
                  /> */}

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
