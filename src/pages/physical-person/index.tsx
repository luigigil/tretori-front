import {
  PHYSICAL_PERSON_BREADCRUMBS,
  PHYSICAL_PERSON_TABLE_FIELDS,
} from 'features/physical-person/info'
import { PhysicalPersonMessages } from 'features/physical-person/physical-person.messages'
import useStandardFetcher from 'hooks/useStandardFetcher'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListProducts() {
  const router = useRouter()
  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/physical-people',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/physical-person'
      messages={PhysicalPersonMessages}
      breadcrumbs={PHYSICAL_PERSON_BREADCRUMBS}
      columns={PHYSICAL_PERSON_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/physical-person/create')}
    ></TablePage>
  )
}
