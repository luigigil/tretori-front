import { Button } from '@mui/material'
import FormContract from 'features/contracts/form-contracts'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailPhysicalPerson() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/contract/${id}`,
  })

  if (error) {
    router.push('/404')
  }

  return (
    <>
      <Button onClick={() => router.push('/contracts')}>Voltar</Button>
      {!isLoading && <FormContract contract={data} shouldCreateNewContract={false}></FormContract>}
    </>
  )
}
