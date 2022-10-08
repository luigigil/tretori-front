import { TableCell, TableHead, TableRow } from '@mui/material'
import { Column } from 'utils/types'

interface TableHeaderProps<T> {
  columns: Column[]
}

export default function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {columns?.map((column: Column) => (
          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
