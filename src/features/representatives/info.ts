import { BreadcrumbType, Column } from 'utils/types'

export const REPRESENTATIVE_TABLE_FIELDS: Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'role', label: 'Cargo', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'insurance', label: 'Seguradora', minWidth: 100 },
  { id: 'company', label: 'Empresa', minWidth: 100 },
]

export const REPRESENTATIVE_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Seguradoras' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
