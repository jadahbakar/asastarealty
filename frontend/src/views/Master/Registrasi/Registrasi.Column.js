import React from 'react'
import { Button } from 'reactstrap'
import { RegistrasiContext } from './Registrasi.Context'

const columns = [
  {
    Header: 'Reg ID',
    accessor: 'reg_id',
    Cell: row => (
      <div style={{ textAlign: 'center' }}>
        <RegistrasiContext.Consumer>
          {context => (
            <Button block color='ghost-info' style={{ fontSize: '1.063em' }} onClick={() => context.toggleOpen()}>
              {row.value}
            </Button>
          )}
        </RegistrasiContext.Consumer>
      </div>
    )
  },
  {
    Header: 'Nama',
    accessor: 'reg_nama',
    Cell: row => <div style={{ marginTop: '0.5em' }}>{row.value}</div>
  },
  {
    Header: 'Email',
    accessor: 'reg_email',
    Cell: row => <div style={{ marginTop: '0.5em' }}>{row.value}</div>
  },
  {
    Header: 'Tanggal',
    accessor: 'reg_date',
    Cell: row => <div style={{ marginTop: '0.5em', textAlign: 'center' }}>{row.value}</div>
  }
]

export default columns
