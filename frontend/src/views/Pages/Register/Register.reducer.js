import { API_ROOT } from 'api'
import axios from 'axios'

export const CHECKED = 'CHECKED'
export const UNCHECKED = 'UNCHECKED'
export const PROPINSI_SELECT = 'PROPINSI_SELECT'

export const FIELD = 'FIELD'
export const CLEAR = 'CLEAR'
export const INPUT_NUMBER = 'INPUT_NUMBER'
const backEndMaster = `${API_ROOT}/master`

export const initialState = {
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
  alamatKTP: 'initial',
  propinsiKTP: '',
  kotaKTP: '',
  kecamatanKTP: '',
  kelurahanKTP: '',
  rtKTP: '',
  rwKTP: '',
  kodePOSKTP: '',
  checkedSama: false,
  email: '',
  password: ''
}

// --------------------------------------- Only Number
const filterNonDigits = value => (value ? value.replace(/\D+/, '') : '')

const registerReducer = (state, action) => {
  switch (action.type) {
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
