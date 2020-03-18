import { useState, useEffect } from 'react'
import axios from 'axios'

// modif dari useHTTP
const useHttp = (url, token) => {
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
  }, [url, token])

  return [fetchedData]
}

export default useHttp
