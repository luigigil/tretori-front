import { TableBody as Body, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { Column } from '../../utils/types/table'

interface TableBodyProps<T> {
  columns: Column[]
  rows: T[]
}

export default function TableBody<T>({ columns, rows }: TableBodyProps<T>) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  return (
    <Body>
      {rows
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        // TODO get rid of this any
        // eslint-disable-next-line
        .map((row: any) => {
          return (
            <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
              {columns?.map((column: Column) => {
                const value = row[column.id]
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number' ? column.format(value) : value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
    </Body>
  )
}
