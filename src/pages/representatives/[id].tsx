import { Button } from '@mui/material'
import axios from 'axios'
import FormRepresentative from 'features/representatives/form-representative'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DetailRepresentative() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.request({
        url: `/representative/${id}`,
        baseURL: 'http://localhost:4200',
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
      <Button onClick={() => router.push('/representatives')}>Voltar</Button>
      {!isLoading && (
        <FormRepresentative
          representative={data}
          shouldCreateNewRepresentative={false}
        ></FormRepresentative>
      )}
    </>
  )
}