import { USERS_BREADCRUMBS, USERS_TABLE_FIELDS } from 'features/users/info'
import { UsersMessages } from 'features/users/users.messages'
import useAxiosFetch from 'hooks/useAxiosFetch'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListUsers() {
  const router = useRouter()
  const [data, error, isLoading] = useAxiosFetch({
    method: 'GET',
    url: '/users',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/users'
      messages={UsersMessages}
      breadcrumbs={USERS_BREADCRUMBS}
      columns={USERS_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/users/create')}
    ></TablePage>
  )
}
