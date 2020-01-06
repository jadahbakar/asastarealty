import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  color: #f86c6b;
  font-size: 0.813em;
`

const ErrroMessage = ({ error }) => {
  if (error) {
    switch (error.type) {
      case 'required':
        return <Div> Harus Di Isi </Div>
      case 'minLength':
        return <Div> Jumlah Karakter Kurang </Div>
      case 'maxLength':
        return <Div> Jumlah Karakter Melebihi </Div>
      case 'pattern':
        return <Div> Tidak Sesuai Ketentuan </Div>
      default:
        return null
    }
  }

  return null
}

export default ErrroMessage
