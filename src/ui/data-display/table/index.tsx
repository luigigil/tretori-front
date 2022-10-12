import { Card, Table as MuiTable, TableContainer } from '@mui/material'
import React from 'react'
import { Column } from 'utils/types'
import TableBody from './table-body'
import TableHeader from './table-header'
import TablePagination from './table-pagination'

interface TableProps<T> {
  columns: Column[]
  rows: T[]
  detailRoute?: string
}

export default function Table<T>({ columns, rows, detailRoute }: TableProps<T>) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  return (
    <>
      <Card>
        <TableContainer sx={{ maxHeight: 600 }}>
          <MuiTable stickyHeader size='small' aria-label='sticky table'>
            <TableHeader columns={columns} />
            <TableBody detailRoute={detailRoute} rows={rows} columns={columns} />
          </MuiTable>
        </TableContainer>
        <TablePagination rows={rows} />
      </Card>
    </>
  )
}
