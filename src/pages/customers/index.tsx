import { CUSTOMERS_BREADCRUMBS, CUSTOMERS_TABLE_FIELDS } from 'features/customers/info'
import { CustomerMessages } from 'features/customers/customers.messages'
import useStandardFetcher from 'hooks/useStandardFetcher'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListProducts() {
  const router = useRouter()
  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/customers',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/customers'
      messages={CustomerMessages}
      breadcrumbs={CUSTOMERS_BREADCRUMBS}
      columns={CUSTOMERS_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/customers/create')}
    ></TablePage>
  )
}
