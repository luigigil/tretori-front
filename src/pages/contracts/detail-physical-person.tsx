import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import FormPhysicalPerson from 'features/physical-person/form-physical-person'
import useAxiosFetch from 'hooks/useAxiosFetch'

export default function DetailPhysicalPerson() {
  const navigate = useNavigate()
  const { physicalPersonId } = useParams()
  const [data, error, isLoading] = useAxiosFetch({
    method: 'GET',
    url: `/physical-person/${physicalPersonId}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => navigate('/physical-person')}>Voltar</Button>
      {!isLoading && (
        <FormPhysicalPerson
          physicalPerson={data}
          shouldCreateNewPhysicalPerson={false}
        ></FormPhysicalPerson>
      )}
    </>
  )
}
