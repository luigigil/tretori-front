import { Button } from '@mui/material'
import FormUsers from 'features/users/form-users'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailUser() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/users/${id}`,
  })

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
