import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FormPhysicalPerson from '../../features/physical-person/form-physical-person'
import { PHYSICAL_PERSON_NEW_TITLE } from '../../features/physical-person/physical-person.messages'
import TitlePage from '../../ui/title/title-page'

export default function CreatePhysicalPerson() {
  const navigate = useNavigate()

  return (
    <>
      <Button
        onClick={() => {
          navigate('/pessoa-fisica')
        }}
      >
        Voltar
      </Button>
      <TitlePage title={PHYSICAL_PERSON_NEW_TITLE}></TitlePage>
      <FormPhysicalPerson shouldCreateNewPhysicalPerson={true}></FormPhysicalPerson>
    </>
  )
}
