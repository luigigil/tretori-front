import { Button } from '@mui/material'
import axios from 'axios'
import FormUsers from 'features/users/form-users'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DetailUser() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.request({
        url: `/users/${id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
    if (id) {
      fetchData()
    }
  }, [id])

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => router.push('/users')}>Voltar</Button>
      {!isLoading && <FormUsers users={data} shouldCreateNewUsers={false}></FormUsers>}
    </>
  )
}
