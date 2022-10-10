import { Button } from '@mui/material'
import FormMovement from 'features/movements/form-movement'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailMovement() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/move/${id}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => router.push('/movements')}>Voltar</Button>
      {!isLoading && <FormMovement movement={data} shouldCreateNewMovement={false}></FormMovement>}
    </>
  )
}
