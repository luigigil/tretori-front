import { PhysicalPersonType } from '../components/shared/types/physical-person'
import client from './axios'

const baseUrl = '/physical-person'

const findById = async (id: number): Promise<PhysicalPersonType> => {
  const result = await client.get(`${baseUrl}/${id}`)
  return result.data
}

const findAll = async (): Promise<PhysicalPersonType[]> => {
  const result = await client.get(baseUrl)
  return result.data
}

const save = async (physicalPerson: PhysicalPersonType): Promise<PhysicalPersonType> => {
  const result = await client.post(baseUrl, physicalPerson)
  return result.data
}

const deleteOneById = async (id: number): Promise<void> => {
  return await client.delete(`/physical-person/${id}`)
}

export default {
  findById,
  findAll,
  save,
  deleteOneById,
}
