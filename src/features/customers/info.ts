import { BreadcrumbType, Column } from 'utils/types'

export const CUSTOMERS_TABLE_FIELDS: Column[] = [
  { id: 'code', label: 'Código', minWidth: 170 },
  { id: 'cep', label: 'CEP', minWidth: 100 },
  { id: 'city', label: 'Cidade', minWidth: 100 },
  { id: 'uf', label: 'UF', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'customer_type', label: 'Tipo de Cliente', minWidth: 100 },
]

export const CUSTOMERS_BREADCRUMBS: BreadcrumbType[] = [
  { key: '1', name: 'Dashboard', link: true, href: '/dashboard' },
  { key: '2', name: 'Clientes' },
  { key: '3', name: 'Consulta', color: 'text.primary' },
]
