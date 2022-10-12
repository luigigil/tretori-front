import { Button } from '@mui/material'
import FormCustomers from 'features/customers/form-customers'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailCustomers() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/customers/${id}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => router.push('/customers')}>Voltar</Button>
      {!isLoading && <FormCustomers customer={data} shouldCreateNew={false}></FormCustomers>}
    </>
  )
}
