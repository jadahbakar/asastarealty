import { useState, useEffect } from 'react'
import axios from 'axios'

const useHttp = (url, token, dependencies) => {
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
  }, dependencies)

  return [fetchedData]
}

export default useHttp
