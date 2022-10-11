import { Button } from '@mui/material'
import FormContract from 'features/contracts/form-contracts'
import { useRouter } from 'next/router'

export default function CreatePhysicalPerson() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/contracts')
        }}
      >
        Voltar
      </Button>
      <FormContract shouldCreateNewContract={true}></FormContract>
    </>
  )
}
