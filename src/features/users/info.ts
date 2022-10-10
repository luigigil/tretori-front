import { BreadcrumbType, Column } from 'utils/types'

export const USERS_TABLE_FIELDS: Column[] = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'roles', label: 'Permissões', minWidth: 100 },
]

export const USERS_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Gestão' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
