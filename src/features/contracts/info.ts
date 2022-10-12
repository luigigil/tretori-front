import { BreadcrumbType, Column } from 'utils/types'

export const CONTRACT_RENEWAL_TABLE_FIELDS: Column[] = [
  { id: 'closed_date', label: 'Data de Fechamento', minWidth: 100 },
  { id: 'closed_value', label: 'Valor de Fechamento', minWidth: 100 },
  { id: 'details', label: 'Detalhes', minWidth: 170 },
  { id: 'proposed_adjustment', label: 'Ajuste Proposto', minWidth: 100 },
  { id: 'proposed_date', label: 'Data Proposta', minWidth: 100 },
]

export const CONTRACT_MOVEMENT_TABLE_FIELDS: Column[] = [
  { id: 'move_date', label: 'Data da Movimentação', minWidth: 100 },
  { id: 'action', label: 'Ação', minWidth: 100 },
  { id: 'description', label: 'Descrição', minWidth: 170 },
  { id: 'details', label: 'Details', minWidth: 170 },
  { id: 'number_of_lives', label: 'Número de Vidas', minWidth: 100 },
]

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
