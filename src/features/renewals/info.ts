import { BreadcrumbType, Column } from 'utils/types'

export const RENEWAL_TABLE_FIELDS: Column[] = [
  { id: 'closed_date', label: 'Data de Fechamento', minWidth: 100 },
  { id: 'closed_value', label: 'Valor de Fechamento', minWidth: 100 },
  { id: 'details', label: 'Detalhes', minWidth: 170 },
  { id: 'proposed_adjustment', label: 'Ajuste Proposto', minWidth: 100 },
  { id: 'proposed_date', label: 'Data Proposta', minWidth: 100 },
]

export const RENEWAL_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Renovação' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
