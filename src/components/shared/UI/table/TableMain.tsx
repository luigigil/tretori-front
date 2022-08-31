import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material'
import React from 'react'
import { Column } from '../../types/table'

interface Data {
  columns: Column[]
  // eslint-disable-next-line
  rows: any[]
  onDelete?: (id: number) => void
  onEdit?: (id: number) => void
}

const TableMain = (props: Data) => {
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
    <React.Fragment>
      <Card>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader size='small' aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {props.columns?.map((column: Column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // eslint-disable-next-line
                .map((row: any) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {props.columns?.map((column: Column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                      <TableCell align='left'>
                        {props.onDelete && (
                          <Tooltip title='Deletar'>
                            <IconButton
                              color='primary'
                              aria-label='delete'
                              component='label'
                              onClick={() => {
                                props.onDelete && props.onDelete(row.id)
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {props.onEdit && (
                          <Tooltip title='Editar'>
                            <IconButton
                              color='primary'
                              aria-label='edit'
                              component='label'
                              onClick={() => props.onEdit && props.onEdit(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component='div'
          count={props.rows?.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage='Itens por página'
          labelDisplayedRows={labelDisplayedRowsHandler}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </React.Fragment>
  )
}

export default TableMain
