import { PHYSICAL_PERSON_NEW_FAIL } from '../components/shared/messages/physical-person'
import { PhysicalPersonType } from '../components/shared/types/physical-person'
import client from './axios'

const baseUrl = '/physical-person'

const findById = async (id: number): Promise<PhysicalPersonType> => {
  try {
    const result = await client.get(`${baseUrl}/${id}`)
    return result.data
  } catch (error) {
    throw new Error('Pessoa Física não encontrada')
  }
}

const findAll = async (): Promise<PhysicalPersonType[]> => {
  try {
    const result = await client.get(baseUrl)
    return result.data
  } catch (error) {
    throw new Error('Lista de pessoas físicas não encontrada')
  }
}

const save = async (physicalPerson: PhysicalPersonType): Promise<PhysicalPersonType> => {
  try {
    const result = await client.post(baseUrl, physicalPerson)
    return result.data
  } catch (error) {
    throw new Error(PHYSICAL_PERSON_NEW_FAIL)
  }
}

const deleteOneById = async (id: number): Promise<void> => {
  try {
    return await client.delete(`/physical-person/${id}`)
  } catch (error) {
    throw new Error(PHYSICAL_PERSON_NEW_FAIL)
  }
}

export default {
  findById,
  findAll,
  save,
  deleteOneById,
}
