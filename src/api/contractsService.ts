import { ContractsType } from '../components/shared/types/contracts'
import client from './axios'

const baseUrl = '/contract'

const getAll = async (): Promise<ContractsType[]> => {
  try {
    const result = await client.get(baseUrl)
    return result.data
  } catch (error) {
    throw new Error('Contratos não encontrados')
  }
}

export default {
  getAll,
}
