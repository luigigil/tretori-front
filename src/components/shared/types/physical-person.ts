import { DateTime } from 'luxon'
import { Contracts } from './contracts'

export interface PhysicalPersonRow {
  name: string
  cpf: string
  rg: string
}

export interface PhysicalPersonType {
  id?: number | null
  name: string
  birthdate: DateTime | string | null
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
  // contracts?: Contracts[]
}
