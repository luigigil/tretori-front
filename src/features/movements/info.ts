import { BreadcrumbType, Column } from 'utils/types'

export const MOVEMENT_TABLE_FIELDS: Column[] = [
  { id: 'contract', label: 'Contrato', minWidth: 170 },
  { id: 'action', label: 'Ação', minWidth: 100 },
  { id: 'move_date', label: 'Data da Movimentação', minWidth: 100 },
  { id: 'number_of_lives', label: 'Número de Vidas', minWidth: 100 },
]

export const MOVEMENT_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Movimentação' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
