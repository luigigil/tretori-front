import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FormPhysicalPerson from 'features/physical-person/form-physical-person'

export default function CreatePhysicalPerson() {
  const navigate = useNavigate()

  return (
    <>
      <Button
        onClick={() => {
          navigate('/physical-person')
        }}
      >
        Voltar
      </Button>
      <FormPhysicalPerson shouldCreateNewPhysicalPerson={true}></FormPhysicalPerson>
    </>
  )
}
