import { PRODUCTS_BREADCRUMBS, PRODUCTS_TABLE_FIELDS } from 'features/products/info'
import { ProductMessages } from 'features/products/product.messages'
import useStandardFetcher from 'hooks/useStandardFetcher'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListProducts() {
  const router = useRouter()
  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/product',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/products'
      messages={ProductMessages}
      breadcrumbs={PRODUCTS_BREADCRUMBS}
      columns={PRODUCTS_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/products/create')}
    ></TablePage>
  )
}
