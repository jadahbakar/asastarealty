/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from 'axios'

const useHttp = (url, token, deps) => {
  const [fetchedData, setFetchedData] = useState([])
  if (token !== '') {
    axios.defaults.headers.common.Authorization = token
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url)
      setFetchedData(result.data)
    }
    fetchData()
  }, deps)

  // ------------------------------Old Method
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios(url);
  //       const json = await response.data;
  //       setFetchedData(json);
  //     } finally {
  //     }
  //   }
  //   if (url !== '') {
  //     fetchData();
  //   }
  // }, deps);

  return [fetchedData]
}

export default useHttp
