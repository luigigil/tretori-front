import Joi from 'joi'

// TODO fix schema
/* eslint-disable camelcase */
export const companySchema = Joi.object({
  id: Joi.number().allow(null),
  name: Joi.string().min(2).max(200).required(),
  type: Joi.string().min(2).max(200).required(),
  plan: Joi.string().min(2).max(200).required(),
  size: Joi.string().min(2).max(200).required(),
})
