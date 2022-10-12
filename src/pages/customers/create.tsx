import { Button } from '@mui/material'
import FormCustomer from 'features/customers/form-customers'
import { useRouter } from 'next/router'

export default function CreateCustomer() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/customers')
        }}
      >
        Voltar
      </Button>
      <FormCustomer shouldCreateNew={true}></FormCustomer>
    </>
  )
}
