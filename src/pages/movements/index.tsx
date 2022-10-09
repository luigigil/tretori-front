import { MOVEMENT_BREADCRUMBS, MOVEMENT_TABLE_FIELDS } from 'features/movements/info'
import { MovementMessages } from 'features/movements/movement.messages'
import useAxiosFetch from 'hooks/useAxiosFetch'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListMovements() {
  const router = useRouter()
  const [data, error, isLoading] = useAxiosFetch({
    method: 'GET',
    url: '/move',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/movements'
      messages={MovementMessages}
      breadcrumbs={MOVEMENT_BREADCRUMBS}
      columns={MOVEMENT_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/movements/create')}
    ></TablePage>
  )
}
