import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import FormPhysicalPerson from 'features/physical-person/form-physical-person'
import useAxiosFetch from 'hooks/useAxiosFetch'

export default function DetailCompanies() {
  const navigate = useNavigate()
  const { physicalPersonId } = useParams()
  const [data, error, isLoading] = useAxiosFetch({
    method: 'GET',
    url: `/company/${physicalPersonId}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => navigate('/companies')}>Voltar</Button>
      {!isLoading && (
        <FormPhysicalPerson
          physicalPerson={data}
          shouldCreateNewPhysicalPerson={false}
        ></FormPhysicalPerson>
      )}
    </>
  )
}
