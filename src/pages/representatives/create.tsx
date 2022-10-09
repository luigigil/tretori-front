import { Button } from '@mui/material'
import FormRepresentative from 'features/representatives/form-representative'
import { useRouter } from 'next/router'

export default function CreateRepresentative() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/representative')
        }}
      >
        Voltar
      </Button>
      <FormRepresentative shouldCreateNewRepresentative={true}></FormRepresentative>
    </>
  )
}
