import { BreadcrumbType, Column } from 'utils/types'

export const PRODUCTS_TABLE_FIELDS: Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'type', label: 'Tipo', minWidth: 100 },
  { id: 'plan', label: 'Plano', minWidth: 100 },
  { id: 'size', label: 'Tamanho', minWidth: 100 },
]

export const PRODUCTS_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Seguradoras' },
  { key: '3', name: 'Produtos', color: 'text.primary' },
]
