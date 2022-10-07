import { PhysicalPersonType } from '../utils/types'
import client from './axios'

const baseUrl = '/physical-person'

const findById = (id: number): Promise<{ data: PhysicalPersonType }> => {
  return client.get(`${baseUrl}/${id}`)
}

const findAll = (): Promise<{ data: PhysicalPersonType[] }> => {
  return client.get(baseUrl)
}

const save = (physicalPerson: PhysicalPersonType): Promise<{ data: PhysicalPersonType }> => {
  return client.post(baseUrl, physicalPerson)
}

const deleteOneById = (id: number): Promise<void> => {
  return client.delete(`/physical-person/${id}`)
}

export default {
  findById,
  findAll,
  save,
  deleteOneById,
}
