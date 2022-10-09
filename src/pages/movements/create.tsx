import { Button } from '@mui/material'
import FormMovement from 'features/movements/form-movement'
import { useRouter } from 'next/router'

export default function CreateMovement() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/movements')
        }}
      >
        Voltar
      </Button>
      <FormMovement shouldCreateNewMovement={true}></FormMovement>
    </>
  )
}
