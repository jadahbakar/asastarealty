/* global sessionStorage */
import React, { useState, useEffect } from 'react'
import { API_ROOT } from 'api'
import axios from 'axios'
import { Button, Card, CardBody, CardHeader, Row, Col } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const backEndUsers = `${API_ROOT}/users`
const titleMenu = ' Users'

const Users = () => {
  const [userData, setUserData] = useState([])

  const [loading, setLoading] = useState(false)

  const getUserData = () => {
    setLoading(true)
    axios.defaults.headers.common.Authorization = sessionStorage.getItem('tkn')
    axios
      .get(`${backEndUsers}`)
      .then(response => {
        setUserData(response.data.allUser)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  const columns = [
    {
      Header: 'User ID',
      accessor: 'user_id',
      // width: 55,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <Button color='ghost-info'>{row.value}</Button>
        </div>
      )
    },
    {
      Header: 'Nama',
      accessor: 'user_nama',
      Cell: row => <div style={{ marginTop: '0.5em' }}>{row.value}</div>
    },
    {
      Header: 'Status',
      accessor: 'user_sts',
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
      Cell: row => <div style={{ marginTop: '0.5em' }}>{row.value}</div>
    },
    {
      Header: 'Role',
      accessor: 'roles_name',
      Cell: row => <div style={{ marginTop: '0.5em' }}>{row.value}</div>
    }
  ]

  useEffect(() => {
    getUserData()
  }, [])

  const content = (
    <>
      <Card>
        <CardHeader>
          <i className='fa fa-table' />
          Table of {titleMenu}
          <div className='card-header-actions' />
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs='6'>
              <Button className='btn-dropbox btn-brand mr-1 mb-1'>
                <i className='fa fa-plus' />
                <span>Tambah User</span>
              </Button>
            </Col>

            <Col xs='6' style={{ textAlign: 'right' }}>
              <Button className='btn-spotify btn-brand mr-1 mb-1'>
                <i className='fa fa-file-excel-o' />
                <span>Export Excel</span>
              </Button>
              <Button className='btn-google-plus btn-brand mr-1 mb-1'>
                <i className='fa fa-file-pdf-o' />
                <span>Export PDF</span>
              </Button>
            </Col>
          </Row>
          <ReactTable data={userData} columns={columns} defaultPageSize={9} className='-striped -highlight' noDataText='Tidak Terdapat Data' loading={loading} />
          {/* modal disini */}
          {/* <ModalUser primary={this.state.primary} togglePrimary={this.togglePrimary} /> */}

          <nav />
        </CardBody>
      </Card>
    </>
  )

  return content
}

export default Users
