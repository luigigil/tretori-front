import { Typography } from '@mui/material'
import Breadcrumb from '../ui/breadcrumbs'
import Loading from '../ui/loading'
import Table from '../ui/table'
import TitlePage from '../ui/title/title-page'
import { BreadcrumbType, Column } from '../utils/types'

interface TablePageProps<T> {
  title: string
  breadcrumbs: BreadcrumbType[]
  columns: Column[]
  rows: T[]
  isLoading: boolean
}

export default function TablePage<T>({
  title,
  breadcrumbs,
  columns,
  rows,
  isLoading,
}: TablePageProps<T>) {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <TitlePage
        title={title}
        onNew={() => {
          console.log('fix this') // ! fix here
        }}
      ></TitlePage>
      {/* // ! fix this isLoading condition */}
      {!isLoading && rows.length <= 0 && (
        <Typography align='center' marginBottom='1em'>
          Nada aqui para ser mostrado
        </Typography>
      )}

      {isLoading ? <Loading /> : <Table columns={columns} rows={rows}></Table>}
    </>
  )
}
