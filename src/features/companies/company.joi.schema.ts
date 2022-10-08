import Joi from 'joi'

/* eslint-disable camelcase */
export const companySchema = Joi.object({
  id: Joi.number().allow(null),
  code: Joi.any(),
  name: Joi.string().min(2).max(200).required(),
  birthdate: Joi.any(),
  cpf: Joi.string().min(11).max(11).required(),
  rg: Joi.string().max(20).required(),
  rg_emissor: Joi.string().max(20).required(),
  rg_emissor_uf: Joi.string().max(20).required(),
  phone: Joi.string().max(25).required(),
  email: Joi.string()
    .max(250)
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  phone_secondary: Joi.string().max(25).allow(null, ''),
  cep: Joi.string().max(20).allow(null, ''),
  address: Joi.string().max(250).allow(null, ''),
  city: Joi.string().max(100).allow(null, ''),
  neighborhood: Joi.string().max(250).allow(null, ''),
  uf: Joi.string().max(20).allow(null, ''),
  contracts: Joi.array().items(Joi.string()),
})
