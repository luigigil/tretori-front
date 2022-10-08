import { Button } from '@mui/material'
import FormProduct from 'features/products/form-product'
import useAxiosFetch from 'hooks/useAxiosFetch'
import { useNavigate, useParams } from 'react-router-dom'

export default function DetailProduct() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const [data, error, isLoading] = useAxiosFetch({
    method: 'GET',
    url: `/product/${productId}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => navigate('/products')}>Voltar</Button>
      {!isLoading && <FormProduct product={data} shouldCreateNewProduct={false}></FormProduct>}
    </>
  )
}
