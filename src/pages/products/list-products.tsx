import { PRODUCTS_BREADCRUMBS, PRODUCTS_TABLE_FIELDS } from 'features/products/info'
import useAxiosFetch from 'hooks/useAxiosFetch'
import TablePage from 'layouts/table-page'
import { PRODUCT_TITLE } from 'features/products/product.messages'
import { useNavigate } from 'react-router-dom'

export default function ListProducts() {
  const navigate = useNavigate()
  const [data, error, isLoading] = useAxiosFetch({
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
      title={PRODUCT_TITLE}
      breadcrumbs={PRODUCTS_BREADCRUMBS}
      columns={PRODUCTS_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => navigate('/products/new')}
    ></TablePage>
  )
}
