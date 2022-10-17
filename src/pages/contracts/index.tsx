import { CONTRACT_BREADCRUMBS, CONTRACT_TABLE_FIELDS } from 'features/contracts/info'
import { ContractMessages } from 'features/contracts/contract.messages'
import useStandardFetcher from 'hooks/useStandardFetcher'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListProducts() {
  const router = useRouter()
  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/contracts',
  })

  if (error) {
    router.push('/404')
  }

  return (
    <TablePage
      detailRoute='/contracts'
      messages={ContractMessages}
      breadcrumbs={CONTRACT_BREADCRUMBS}
      columns={CONTRACT_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/contracts/create')}
    ></TablePage>
  )
}
