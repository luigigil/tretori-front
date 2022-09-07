import { DateTime } from 'luxon'

export interface PhysicalPersonRow {
  name: string
  cpf: string
  rg: string
}

export interface PhysicalPersonType {
  id?: number
  name: string
  birthdate: DateTime
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
