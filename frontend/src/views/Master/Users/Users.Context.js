import React, { useState, createContext } from 'react'
import axios from 'axios'
import { API_ROOT } from 'api'

export const RegistrasiContext = createContext()

export const RegistrasiProvider = props => {
  const [modalOpen, setModalOpen] = useState(false)
  const [regID, setRegID] = useState('')
  const [referalID, setReferalID] = useState('')
  const titleMenu = ' Registrasi'
  const backEndReg = `${API_ROOT}/registrasi`
  const [fetchTableData, setFetchTableData] = useState([])

  const reloadTableData = () => {
    axios.get(`${backEndReg}/all`).then(response => {
      console.log('TCL: reloadTableData -> response.data', response.data)
      setFetchTableData(response.data)
    })
  }

  // const fetchData = async () => {
  //   const result = await axios(`${backEndLogin}`);
  //   setFetchTableData(result.data.token);
  // };

  const toggleOpen = () => {
    setModalOpen(modalOpen === false)
  }

  const onRowClick = (state, rowInfo) => ({
    onClick: () => {
      setRegID(rowInfo.original.reg_id)
    }
  })

  const onChangeReferal = e => {
    setReferalID(e.target.value)
  }

  const content = (
    <>
      <RegistrasiContext.Provider
        value={{
          titleMenu,
          backEndReg,
          modalOpen,
          toggleOpen,
          regID,
          onRowClick,
          referalID,
          onChangeReferal,
          fetchTableData,
          setFetchTableData,
          reloadTableData
        }}
      >
        {props.children}
      </RegistrasiContext.Provider>
    </>
  )
  return content
}
