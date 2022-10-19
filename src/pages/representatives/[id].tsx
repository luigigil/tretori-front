import { Button } from '@mui/material'
import FormRepresentative from 'features/representatives/form-representative'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailRepresentative() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/representatives/${id}`,
  })

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
