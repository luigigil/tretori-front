import {
  PHYSICAL_PERSON_BREADCRUMBS,
  PHYSICAL_PERSON_TABLE_FIELDS,
} from 'features/physical-person/info'
import useAxiosFetch from 'hooks/useAxiosFetch'
import TablePage from 'layouts/table-page'
import { PHYSICAL_PERSON_TITLE } from 'features/physical-person/physical-person.messages'
import { useNavigate } from 'react-router-dom'

export default function ListPhysicalPerson() {
  const navigate = useNavigate()
  const [data, error, isLoading] = useAxiosFetch({
    method: 'GET',
    url: '/physical-person',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/pessoa-fisica'
      title={PHYSICAL_PERSON_TITLE}
      breadcrumbs={PHYSICAL_PERSON_BREADCRUMBS}
      columns={PHYSICAL_PERSON_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => navigate('/pessoa-fisica/new')}
    ></TablePage>
  )
}
