import {
  REPRESENTATIVE_BREADCRUMBS,
  REPRESENTATIVE_TABLE_FIELDS,
} from 'features/representatives/info'
import { RepresentativeMessages } from 'features/representatives/representative.messages'
import useStandardFetcher from 'hooks/useStandardFetcher'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListProducts() {
  const router = useRouter()
  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/representative',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/representatives'
      messages={RepresentativeMessages}
      breadcrumbs={REPRESENTATIVE_BREADCRUMBS}
      columns={REPRESENTATIVE_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/representatives/create')}
    ></TablePage>
  )
}
