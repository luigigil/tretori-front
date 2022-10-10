import { Button } from '@mui/material'
import FormPhysicalPerson from 'features/physical-person/form-physical-person'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useRouter } from 'next/router'

export default function DetailPhysicalPerson() {
  const router = useRouter()
  const { id } = router.query

  const [data, error, isLoading] = useStandardFetcher({
    url: `/physical-person/${id}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <>
      <Button onClick={() => router.push('/physical-person')}>Voltar</Button>
      {!isLoading && (
        <FormPhysicalPerson
          physicalPerson={data}
          shouldCreateNewPhysicalPerson={false}
        ></FormPhysicalPerson>
      )}
    </>
  )
}
