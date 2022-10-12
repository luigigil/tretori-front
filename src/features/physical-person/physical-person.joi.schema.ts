import Joi from 'joi'

/* eslint-disable camelcase */
export const physicalPersonSchema = Joi.object({
  id: Joi.number().allow(null),
  code: Joi.any(),
  name: Joi.string().min(2).max(200).required(),
  birthdate: Joi.any(),
  cpf: Joi.string().min(11).max(11).required(),
  rg: Joi.string().max(20).required(),
  rg_emissor: Joi.string().max(20).required(),
  rg_emissor_uf: Joi.string().max(20).required(),
})
