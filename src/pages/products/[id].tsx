import { Button } from '@mui/material'
import FormProduct from 'features/products/form-product'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailPhysicalPerson() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/product/${id}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => router.push('/products')}>Voltar</Button>
      {!isLoading && <FormProduct product={data} shouldCreateNewProduct={false}></FormProduct>}
    </>
  )
}
