import Joi from 'joi'

/* eslint-disable camelcase */
export const insuranceSchema = Joi.object({
  id: Joi.number().allow(null),
  phone: Joi.string().min(2).max(200).required(),
  phone_secondary: Joi.string().min(2).max(200).required(),
  address: Joi.string().min(2).max(200).required(),
  cep: Joi.string().min(2).max(200).required(),
  city: Joi.string().min(2).max(200).required(),
  neighborhood: Joi.string().min(2).max(200).required(),
  uf: Joi.string().min(2).max(200).required(),
  email: Joi.string().min(2).max(200).required(),
  fantasy_name: Joi.string().min(2).max(200).required(),
  cnpj: Joi.string().min(2).max(200).required(),
  social_reason: Joi.string().min(2).max(200).required(),
  type: Joi.string().min(2).max(200).required(),
  size: Joi.string().min(2).max(200).required(),
  representatives: Joi.any(),
  contracts: Joi.any(),
})
