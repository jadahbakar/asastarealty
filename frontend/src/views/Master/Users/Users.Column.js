import React from 'react'
import { Button } from 'reactstrap'
import { UsersContext } from './Users.Context'

const styles = {
  colStyle: {
    marginTop: '0.5em'
  }

}

const columns = [
  {
    Header: 'User ID',
    accessor: 'user_id',
    Cell: row => (
      <div style={{ textAlign: 'center' }}>
        <UsersContext.Consumer>
          {context => (
            <Button block color='ghost-info'>
              {row.value}
            </Button>
          )}
        </UsersContext.Consumer>
      </div>
    )
  },
  {
    Header: 'Nama',
    accessor: 'user_nama',
    filterable: true,
    Cell: row => <div style={styles.colStyle}>{row.value}</div>
  },
  {
    Header: 'Status',
    accessor: 'user_sts',
    filterable: false,
    width: 75,
    Cell: row => (
      <div style={{ textAlign: 'center', marginTop: '0.5em' }}>
        <span
          style={{
            color: row.value === 0 ? '#ff2e00' : '#57d500',
            transition: 'all .3s ease'
          }}
        >
          &#x25cf;
        </span>
        {row.value === 0 ? ' Pasif' : ' Aktif'}
      </div>
    )
  },
  {
    Header: 'Email',
    accessor: 'user_email',
    filterable: false,
    Cell: row => <div style={styles.colStyle}>{row.value}</div>
  },
  {
    Header: 'Role',
    accessor: 'roles_name',
    filterable: false,
    Cell: row => <div style={styles.colStyle}>{row.value}</div>
  }
]

export default columns
