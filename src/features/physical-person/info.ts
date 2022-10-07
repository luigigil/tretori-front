import { BreadcrumbType, Column } from '../../utils/types'

export const PHYSICAL_PERSON_TABLE_FIELDS: Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'cpf', label: 'CPF', minWidth: 100 },
  { id: 'rg', label: 'RG', minWidth: 100 },
]

export const PHYSICAL_PERSON_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Pessoa' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
