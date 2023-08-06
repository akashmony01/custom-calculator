import { useEffect, useRef, useState } from "react"
import axios from "axios"

const useAxiosFetch = axiosParams => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  const controllerRef = useRef(new AbortController())
  const cancelRequest = () => {
    controllerRef.current.abort()
  }

  const fetchData = async params => {
    try {
      const result = await axios.request({
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        ...params,
        signal: controllerRef.current.signal,
      })

      setResponse(result.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const refetchData = () => {
    fetchData(axiosParams)
  }

  useEffect(() => {
    fetchData(axiosParams)
  }, [])

  return { cancelRequest, response, error, loading, refetchData }
}

export default useAxiosFetch
