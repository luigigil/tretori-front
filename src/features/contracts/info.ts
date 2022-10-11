import { BreadcrumbType, Column } from 'utils/types'

export const CONTRACT_TABLE_FIELDS: Column[] = [
  { id: 'policy', label: 'Apólice', minWidth: 100 },
  // { id: 'policy', label: 'Produto', minWidth: 100 },
  { id: 'validity_start', label: 'Início da Vigência', minWidth: 170 },
  { id: 'validity_end', label: 'Fim da Vigência', minWidth: 170 },
  { id: 'validity_time', label: 'Tempo da Vigência', minWidth: 170 },
]

export const CONTRACT_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Contratos' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
