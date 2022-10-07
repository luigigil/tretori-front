import { Typography } from '@mui/material'
import Breadcrumb from '../ui/breadcrumbs/bread-crumbs'
import TableMain from '../ui/table'
import TitlePage from '../ui/title/title-page'
import { PHYSICAL_PERSON_TITLE } from '../utils/messages/physical-person'
import { Column } from '../utils/types/table'

interface TablePageProps<T> {
  breadcrumbs: JSX.Element[]
  columns: Column[]
  rows: T[]
  isLoading: boolean
}

export default function TablePage<T>({ breadcrumbs, columns, rows, isLoading }: TablePageProps<T>) {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <TitlePage
        title={PHYSICAL_PERSON_TITLE}
        onNew={() => {
          console.log('fix this') // ! fix here
        }}
      ></TitlePage>
      {rows.length <= 0 && (
        <Typography align='center' marginBottom='1em'>
          Nada aqui para ser mostrado
        </Typography>
      )}
      <TableMain columns={columns} rows={rows}></TableMain>
    </>
  )
}
