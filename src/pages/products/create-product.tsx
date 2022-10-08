import { Button } from '@mui/material'
import FormProduct from 'features/products/form-product'
import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {
  const navigate = useNavigate()

  return (
    <>
      <Button
        onClick={() => {
          navigate('/products')
        }}
      >
        Voltar
      </Button>
      <FormProduct shouldCreateNewProduct={true}></FormProduct>
    </>
  )
}
