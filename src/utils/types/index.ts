export interface SnackBarType {
  open: boolean
  duration: number
  severity: Severity
  message: string
}
export interface BreadcrumbType {
  key: string
  name: string
  link?: boolean
  href?: string
  color?: string
}

export interface ContractType {
  id: number
}

export interface ListItemType {
  id: number
  label: string
}

export interface Severity {
  types: 'error' | 'warning' | 'info' | 'success'
}

export interface PhysicalPersonType {
  id?: number
  name: string
  birthdate: string
  cpf: string
  rg: string
  rg_emissor: string
  rg_emissor_uf: string
  phone: string
  email: string
  phone_secondary?: string
  code?: string
  cep?: string
  address?: string
  city?: string
  neighborhood?: string
  uf?: string
  contracts?: string[]
}

export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

export enum NotificationEnum {
  ERROR = 'error',
  WARN = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface EntityMessageTypes {
  entityName: string
  title: string
  detailTitle: string
  newTitle: string
  editTitle: string
  newSuccess: string
  editSuccess: string
  deleteTitle: string
  deleteMessage: string
  deleteSuccess: string
}

export interface RepresentativeType {
  id?: number
  type: string
  name: string
  role: string
  description: string
  email: string
  phone: string
  birthdate: string
  insurance: string
  company: string
}

export interface InsuranceType {
  id?: number
  code?: string
  email: string
  phone: string
  phone_secondary: string
  address: string
  cep: string
  city: string
  neighborhood: string
  uf: string
  fantasy_name: string
  cnpj: string
  social_reason: string
  type: string
  size: string
  representatives: string
  contracts: [string]
}

export interface MovementType {
  id?: number
  move_date: string
  action: string
  number_of_lives: string
  description: string
  details: string
  // contract: ContractType
  contract: string
}

export interface CompanyType {
  id?: number
  code?: string
  phone: string
  phone_secondary: string
  address: string
  cep: string
  city: string
  neighborhood: string
  uf: string
  email: string
  fantasy_name: string
  cnpj: string
  social_reason: string
  type: string
  size: string
  representatives: string
  contracts: [string]
}

export interface UsersType {
  id?: number
  username: string
  password: string
  roles?: string
}
