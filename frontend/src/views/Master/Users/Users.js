
import React, { useEffect, useContext } from 'react'
// import axios from 'axios'
import { Button, Card, CardBody, CardHeader, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { UsersProvider, UsersContext } from './Users.Context'

import UsrColumn from './Users.Column'

const Users = () => {
  const content = (
    <>
      <UsersProvider>
        <CardContent />
      </UsersProvider>
    </>
  )
  return content
}

const CardContent = () => {
  const context = useContext(UsersContext)

  useEffect(() => {
    context.reloadTableData()
  }, [])

  const content = (
    <>
      <Card>
        <CardHeader>
          <i className='fa fa-table' />Table of {context.titleMenu}
          <div className='card-header-actions' />
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs='6'>
              <Link to='/master/users/detail'>
                <Button className='btn-dropbox btn-brand mr-1 mb-1'>
                  <i className='fa fa-plus' />
                  <span>Tambah User</span>
                </Button>
              </Link>
            </Col>
          </Row>
          <div style={{ marginTop: '0.5em' }} />
          <ReactTable
            data={context.fetchTableData} columns={UsrColumn} defaultPageSize={9} className='-striped -highlight' noDataText='Tidak Terdapat Data' loading={context.loading} filterable
          />
          <nav />
        </CardBody>
      </Card>
    </>
  )

  return content
}

export default Users
