import { Typography } from '@mui/material'
import Table from 'ui/data-display/table'
import TitlePage from 'ui/data-display/title/title-page'
import Loading from 'ui/feedback/loading'
import Breadcrumb from 'ui/navigation/breadcrumbs'
import { BreadcrumbType, Column, EntityMessageTypes } from 'utils/types'

interface TablePageProps<T> {
  messages: EntityMessageTypes
  breadcrumbs: BreadcrumbType[]
  columns: Column[]
  rows: T[]
  isLoading: boolean
  detailRoute?: string
  onNewClick?: () => void
}

export default function TablePage<T>({
  messages,
  breadcrumbs,
  columns,
  rows,
  isLoading,
  detailRoute,
  onNewClick,
}: TablePageProps<T>) {
  const renderTable = () => {
    if (isLoading) {
      return <Loading />
    }

    if (rows.length === 0) {
      return (
        <Typography align='center' marginBottom='1em'>
          Nenhum registro encontrado
        </Typography>
      )
    }

    return <Table detailRoute={detailRoute} columns={columns} rows={rows}></Table>
  }

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <TitlePage title={messages.title} onNew={onNewClick}></TitlePage>
      {renderTable()}
    </>
  )
}
