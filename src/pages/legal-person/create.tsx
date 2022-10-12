import { Button } from '@mui/material'
import FormLegalPerson from 'features/legal-person/form-legal-person'
import { useRouter } from 'next/router'

export default function CreateLegalPerson() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/legal-person')
        }}
      >
        Voltar
      </Button>
      <FormLegalPerson shouldCreateNew={true}></FormLegalPerson>
    </>
  )
}
