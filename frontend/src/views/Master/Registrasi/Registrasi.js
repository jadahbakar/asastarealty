import React, { useContext, useEffect } from 'react'
// import { useHttp } from 'component';
import { Card, CardBody, CardHeader } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { RegistrasiProvider, RegistrasiContext } from './Registrasi.Context'
import RegColumn from './Registrasi.Column'
import RegistrasiModal from './Registrasi.Modal'
// import axios from 'axios';

const Registrasi = () => {
  const content = (
    <>
      <RegistrasiProvider>
        <CardContent />
      </RegistrasiProvider>
    </>
  )
  return content
}

const CardContent = () => {
  const context = useContext(RegistrasiContext)
  // const { fetchData, setFetchData } = this.state([]);
  // const [fetchData] = useHttp(
  //   `${context.backEndReg}/all`,
  //   sessionStorage.getItem('tkn'),
  //   []
  // );
  // const fetchReg = fetchData ? fetchData : [];

  // useEffect(() => {
  //   console.log('masuk.....');
  //   context.reloadTableData();
  // }, [context.fetchTableData]);

  // useEffect(() => {
  //   context.reloadTableData()
  // }, [context.setFetchTableData])

  useEffect(() => {
    context.reloadTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const content = (
    <>
      <Card>
        <CardHeader>
          <i className='fa fa-table' />
          Table of {context.titleMenu}
          <div className='card-header-actions' />
        </CardHeader>
        <CardBody>
          <div style={{ marginTop: '0.5em' }} />
          <ReactTable
            data={context.fetchTableData}
            // data={context.reloadTableData()}
            columns={RegColumn}
            defaultPageSize={11}
            className='-striped -highlight'
            noDataText='Tidak Terdapat Data'
            getTdProps={context.onRowClick}
            // onFetchData={context.reloadTableData()}
          />

          <RegistrasiModal />
        </CardBody>
      </Card>
    </>
  )

  return content
}

export default Registrasi
