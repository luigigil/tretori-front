import { Button } from '@mui/material'
import FormPhysicalPerson from 'features/physical-person/form-physical-person'
import { useRouter } from 'next/router'

export default function CreatePhysicalPerson() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/physical-person')
        }}
      >
        Voltar
      </Button>
      <FormPhysicalPerson shouldCreateNewPhysicalPerson={true}></FormPhysicalPerson>
    </>
  )
}
