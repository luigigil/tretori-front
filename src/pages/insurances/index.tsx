import { INSURANCE_BREADCRUMBS, INSURANCE_TABLE_FIELDS } from 'features/insurances/info'
import { InsuranceMessages } from 'features/insurances/insurance.messages'
import useStandardFetcher from 'hooks/useStandardFetcher'
import TablePage from 'layouts/table-page'
import { useRouter } from 'next/router'

export default function ListInsurances() {
  const router = useRouter()
  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/insurance',
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  return (
    <TablePage
      detailRoute='/insurances'
      messages={InsuranceMessages}
      breadcrumbs={INSURANCE_BREADCRUMBS}
      columns={INSURANCE_TABLE_FIELDS}
      rows={data}
      isLoading={isLoading}
      onNewClick={() => router.push('/insurances/create')}
    ></TablePage>
  )
}
