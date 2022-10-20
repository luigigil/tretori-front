import { BreadcrumbType, Column } from 'utils/types'

export const LEGAL_PERSON_TABLE_FIELDS: Column[] = [
  { id: 'type', label: 'Tipo', minWidth: 170 },
  { id: 'cnpj', label: 'CNPJ', minWidth: 100 },
  { id: 'fantasy_name', label: 'Nome Fantasia', minWidth: 100 },
  { id: 'social_reason', label: 'Razão Social', minWidth: 100 },
]

export const LEGAL_PERSON_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Pessoa Jurídica' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
