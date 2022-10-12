import Joi from 'joi'

/* eslint-disable camelcase */
export const legalPersonSchema = Joi.object({
  id: Joi.number().allow(null),
  cnpj: Joi.string().min(2).max(200).required(),
  fantasy_name: Joi.string().min(1).max(20).required(),
  social_reason: Joi.string().max(20).required(),
  type: Joi.string().max(20).required(),
  size: Joi.string().max(20).required(),
  representatives: Joi.string().max(25),
})
