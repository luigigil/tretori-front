import Joi from 'joi'

/* eslint-disable camelcase */
export const customerSchema = Joi.object({
  id: Joi.number().allow(null),
  code: Joi.any().allow(null),
  phone: Joi.string(),
  phone_secondary: Joi.string(),
  address: Joi.string(),
  cep: Joi.string(),
  city: Joi.string(),
  neighborhood: Joi.string(),
  uf: Joi.string(),
  email: Joi.string(),
  customer_type: Joi.string(),
})
