import { BreadcrumbType, Column } from 'utils/types'

export const INSURANCE_TABLE_FIELDS: Column[] = [
  { id: 'fantasy_name', label: 'Nome', minWidth: 170 },
  { id: 'cnpj', label: 'CNPJ', minWidth: 100 },
  { id: 'type', label: 'Tipo', minWidth: 100 },
  { id: 'size', label: 'Tamanho', minWidth: 100 },
  { id: 'uf', label: 'UF', minWidth: 100 },
]

export const INSURANCE_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Seguradoras' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
