import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

export default function useAxiosFetch(params: AxiosRequestConfig<any>) {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.request({
        ...params,
        baseURL: process.env.NEXT_PUBLIC_REACT_APP_AXIOS_BASE_URL,
      })
      setData(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Axios Error with Message: ' + error.message)
      } else {
        setError(error)
      }

      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, error, isLoading, fetchData] as const
}
