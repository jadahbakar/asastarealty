/* global sessionStorage */
import React, { useState, createContext } from 'react'
import axios from 'axios'
import { API_ROOT } from 'api'

export const UsersContext = createContext()

export const UsersProvider = props => {
  const [modalOpen, setModalOpen] = useState(false)
  const [regID, setRegID] = useState('')
  const [referalID, setReferalID] = useState('')
  const titleMenu = ' User'
  const backEndUsers = `${API_ROOT}/users`
  const [fetchTableData, setFetchTableData] = useState([])

  const [loading, setLoading] = useState(false)

  // const reloadTableData = () => {
  //   axios.get(`${backEndUsers}`).then(response => {
  //     setFetchTableData(response.data.allUser)
  //   })
  // }

  const reloadTableData = () => {
    setLoading(true)
    axios.defaults.headers.common.Authorization = sessionStorage.getItem('tkn')
    axios
      .get(`${backEndUsers}`)
      .then(response => {
        setFetchTableData(response.data.allUser)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        if (error) {
          console.log('TCL: reloadTableData -> error', error)
        }
      })
  }

  const toggleOpen = () => {
    setModalOpen(modalOpen === false)
  }

  const onRowClick = (state, rowInfo) => ({
    onClick: () => {
      setRegID(rowInfo.original.user_id)
    }
  })

  const onChangeReferal = e => {
    setReferalID(e.target.value)
  }

  const content = (
    <>
      <UsersContext.Provider
        value={{
          titleMenu,
          backEndUsers,
          modalOpen,
          toggleOpen,
          regID,
          onRowClick,
          referalID,
          onChangeReferal,
          fetchTableData,
          setFetchTableData,
          reloadTableData,
          loading
        }}
      >
        {props.children}
      </UsersContext.Provider>
    </>
  )
  return content
}
