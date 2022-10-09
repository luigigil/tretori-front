import { Button } from '@mui/material'
import FormInsurance from 'features/insurances/form-insurance'
import { useRouter } from 'next/router'

export default function CreateInsurance() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/insurances')
        }}
      >
        Voltar
      </Button>
      <FormInsurance shouldCreateNewInsurance={true}></FormInsurance>
    </>
  )
}
