import { TablePagination as Pagination } from '@mui/material'
import React from 'react'

interface TableMainProps<T> {
  rows: T[]
}

export default function TablePagination<T>({ rows }: TableMainProps<T>) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const labelDisplayedRowsHandler = ({
    from,
    to,
    count,
  }: {
    from: number
    to: number
    count: number
  }): string => {
    const except = `mais que ${to}`
    return `${from} - ${to} de ${count !== -1 ? count : except}`
  }

  return (
    <Pagination
      rowsPerPageOptions={[5, 10, 25, 100]}
      component='div'
      count={rows?.length}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage='Itens por página'
      labelDisplayedRows={labelDisplayedRowsHandler}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
