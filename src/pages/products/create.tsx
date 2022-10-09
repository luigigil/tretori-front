import { Button } from '@mui/material'
import FormProduct from 'features/products/form-product'
import { useRouter } from 'next/router'

export default function CreatePhysicalPerson() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/products')
        }}
      >
        Voltar
      </Button>
      <FormProduct shouldCreateNewProduct={true}></FormProduct>
    </>
  )
}
