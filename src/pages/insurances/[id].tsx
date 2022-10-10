import { Button } from '@mui/material'
import FormInsurance from 'features/insurances/form-insurance'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailInsurance() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/insurance/${id}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => router.push('/insurances')}>Voltar</Button>
      {!isLoading && (
        <FormInsurance insurance={data} shouldCreateNewInsurance={false}></FormInsurance>
      )}
    </>
  )
}
