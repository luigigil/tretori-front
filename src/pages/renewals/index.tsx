import { RENEWAL_BREADCRUMBS, RENEWAL_TABLE_FIELDS } from 'features/renewals/info'
import { RenewalMessages } from 'features/renewals/renewal.messages'
import useStandardFetcher from 'hooks/useStandardFetcher'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListRenewals() {
  const router = useRouter()
  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/renew',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/renewals'
      messages={RenewalMessages}
      breadcrumbs={RENEWAL_BREADCRUMBS}
      columns={RENEWAL_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/renewals/create')}
    ></TablePage>
  )
}
