import { ContractsType } from '../components/shared/types/contracts'
import client from './axios'

const baseUrl = '/contract'

const getAll = async (): Promise<ContractsType[]> => {
  const result = await client.get(baseUrl)
  return result.data
}

export default {
  getAll,
}
