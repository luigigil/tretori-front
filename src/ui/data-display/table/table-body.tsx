import { TableBody as Body, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Column } from 'utils/types'

interface TableBodyProps<T> {
  columns: Column[]
  rows: T[]
  detailRoute?: string
}

export default function TableBody<T>({ columns, rows, detailRoute }: TableBodyProps<T>) {
  const navigate = useNavigate()
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
                  <TableCell
                    onClick={() => {
                      navigate(`${detailRoute}/${row.id}`)
                    }}
                    key={column.id}
                    align={column.align}
                    style={{ cursor: 'pointer' }}
                  >
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
