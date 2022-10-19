import { LEGAL_PERSON_BREADCRUMBS, LEGAL_PERSON_TABLE_FIELDS } from 'features/legal-person/info'
import { LegalPersonMessages } from 'features/legal-person/legal-person.messages'
import useStandardFetcher from 'hooks/useStandardFetcher'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListProducts() {
  const router = useRouter()
  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/legal-people',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/legal-person'
      messages={LegalPersonMessages}
      breadcrumbs={LEGAL_PERSON_BREADCRUMBS}
      columns={LEGAL_PERSON_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/legal-person/create')}
    ></TablePage>
  )
}
