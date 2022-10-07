import { ContractsType } from '../utils/types'
import client from './axios'

const baseUrl = '/contract'

const findAll = async (): Promise<{ data: ContractsType[] }> => {
  return client.get(baseUrl)
}

export default {
  findAll,
}
