import { TableBody as Body, TableCell, TableRow } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { Column } from 'utils/types'

interface TableBodyProps<T> {
  columns: Column[]
  rows: T[]
  detailRoute?: string
}

export default function TableBody<T>({ columns, rows, detailRoute }: TableBodyProps<T>) {
  const router = useRouter()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  return (
    <Body>
      {(rows as T[])
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        // TODO get rid of this any
        // eslint-disable-next-line
        .map((row: any, index: number) => {
          return (
            <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
              {columns?.map((column: Column) => {
                const value = row[column.id]
                return (
                  <TableCell
                    onClick={() => {
                      if (detailRoute) {
                        router.push(`${detailRoute}/${row.id}`)
                      }
                    }}
                    key={column.id}
                    align={column.align}
                    style={{ cursor: detailRoute ? 'pointer' : 'default' }}
                    id={`${index}-${column.id}`}
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
