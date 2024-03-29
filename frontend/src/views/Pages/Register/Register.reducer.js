// import { API_ROOT } from 'api'
// import axios from 'axios's
import { useFetch } from 'component'
import { API_ROOT } from 'api'

const backEndMaster = `${API_ROOT}/master`

export const CHECKED = 'CHECKED'
export const UNCHECKED = 'UNCHECKED'
export const PROPINSI_SELECT = 'PROPINSI_SELECT'

export const FIELD = 'FIELD'
export const CLEAR = 'CLEAR'
export const INPUT_NUMBER = 'INPUT_NUMBER'
// const backEndMaster = `${API_ROOT}/master`

export const initialState = {
  // nama: 'test',
  // tempatLahir: 'semarang',
  // tanggalLahir: '2014-04-19',
  // nik: '3374033012810001',
  // kk: '3374033012810001',
  // agama: '1',
  // hp: '0819992981881',
  // pekerjaan: 'Wirausaha',
  // statusNikah: '1',
  // alamat: 'Semarang Timur',
  // propinsi: '33',
  // kota: '3374',
  // kecamatan: '3374080',
  // kelurahan: '3374080006',
  // rt: '08',
  // rw: '07',
  // kodePOS: '50198',
  // alamatKTP: '',
  // propinsiKTP: '',
  // kotaKTP: '',
  // kecamatanKTP: '',
  // kelurahanKTP: '',
  // rtKTP: '',
  // rwKTP: '',
  // kodePOSKTP: '',
  // checkedSama: false,
  // email: 'dedy@gmail.com',
  // password: 'asdfghjkl'
  nama: '',
  tempatLahir: '',
  tanggalLahir: '',
  nik: '',
  kk: '',
  agama: '',
  hp: '',
  pekerjaan: '',
  statusNikah: '',
  alamat: '',
  propinsi: '',
  kota: '',
  kecamatan: '',
  kelurahan: '',
  rt: '',
  rw: '',
  kodePOS: '',
  alamatKTP: '',
  propinsiKTP: '',
  kotaKTP: '',
  kecamatanKTP: '',
  kelurahanKTP: '',
  rtKTP: '',
  rwKTP: '',
  kodePOSKTP: '',
  checkedSama: false,
  email: '',
  password: '',
  kotaList: []
  // useFetch(`${backEndMaster}/kota/${action.payload}`)
}

// --------------------------------------- Only Number
const filterNonDigits = value => (value ? value.replace(/\D+/, '') : '')

const registerReducer = (state, action) => {
  switch (action.type) {
    case PROPINSI_SELECT: {
      return {
        ...state,
        [action.fieldName]: action.payload,
        // kotaList: useFetch(`${backEndMaster}/kota/${action.payload}`)
      }
    }
    case FIELD: {
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    }
    case INPUT_NUMBER: {
      return {
        ...state,
        [action.fieldName]: filterNonDigits(action.payload)
      }
    }
    case CLEAR: {
      return {
        initialState
      }
    }
    case CHECKED: {
      return {
        ...state,
        checkedSama: true,
        alamatKTP: state.alamat,
        propinsiKTP: state.propinsi,
        kotaKTP: state.kota,
        kecamatanKTP: state.kecamatan,
        kelurahanKTP: state.kelurahan,
        rtKTP: state.rt,
        rwKTP: state.rw,
        kodePOSKTP: state.kodePOS
      }
    }
    case UNCHECKED: {
      return {
        ...state,
        checkedSama: false,
        alamatKTP: '',
        propinsiKTP: '',
        kotaKTP: '',
        kecamatanKTP: '',
        kelurahanKTP: '',
        rtKTP: '',
        rwKTP: '',
        kodePOSKTP: ''
      }
    }

    default:
      return state
  }
}

export default registerReducer
