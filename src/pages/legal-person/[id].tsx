import { Button } from '@mui/material'
import FormLegalPerson from 'features/legal-person/form-legal-person'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailLegalPerson() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/legal-person/${id}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => router.push('/legal-person')}>Voltar</Button>
      {!isLoading && <FormLegalPerson legalPerson={data} shouldCreateNew={false}></FormLegalPerson>}
    </>
  )
}
