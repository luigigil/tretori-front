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

export interface ContractsType {
  id: number
}

export interface ListItemType {
  id: number
  label: string
}

export interface Severity {
  types: 'error' | 'warning' | 'info' | 'success'
}

export interface PhysicalPersonRow {
  name: string
  cpf: string
  rg: string
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
