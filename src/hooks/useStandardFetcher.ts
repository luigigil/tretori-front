import axios, { AxiosRequestConfig } from 'axios'
import { getSession, useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { SERVER_ERROR } from 'utils/messages'

export default function useStandardFetcher(params: AxiosRequestConfig<any>) {
  const { enqueueSnackbar } = useSnackbar()
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    try {
      let _session

      if (!session) {
        _session = await getSession()
      } else {
        _session = session
      }

      const response = await axios.request({
        ...params,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          ...params.headers,
          Authorization: `Bearer ${_session?.accessToken}`,
        },
      })
      setData(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Axios Error with Message: ' + error.message)
      } else {
        setError(error)
      }

      enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
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
