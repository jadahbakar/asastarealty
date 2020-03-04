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
  }, [deps])

  return [fetchedData]
}

export default useHttp
