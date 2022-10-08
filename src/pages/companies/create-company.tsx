import { Button } from '@mui/material'
import FormCompany from 'features/companies/form-company'
import { useNavigate } from 'react-router-dom'

export default function CreateCompany() {
  const navigate = useNavigate()

  return (
    <>
      <Button
        onClick={() => {
          navigate('/company')
        }}
      >
        Voltar
      </Button>
      <FormCompany shouldCreateNewPhysicalPerson={true}></FormCompany>
    </>
  )
}
