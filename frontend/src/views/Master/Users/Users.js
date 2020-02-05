/* global sessionStorage */
import React, { useState, useEffect } from 'react'
import { API_ROOT } from 'api'
import axios from 'axios'
import { Button, Card, CardBody, CardHeader, Row, Col } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import UsrColumn from './Users.Column'

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

  useEffect(() => {
    getUserData()
  }, [])

  const content = (
    <>
      <Card>
        <CardHeader>
          <i className='fa fa-table' />Table of {titleMenu}
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
          </Row>
          <div style={{ marginTop: '0.5em' }} />
          <ReactTable
            data={userData} columns={UsrColumn} defaultPageSize={9} className='-striped -highlight' noDataText='Tidak Terdapat Data' loading={loading} filterable
          />
          <nav />
        </CardBody>
      </Card>
    </>
  )

  return content
}

export default Users
