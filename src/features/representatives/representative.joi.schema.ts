import Joi from 'joi'

/* eslint-disable camelcase */
export const representativeSchema = Joi.object({
  id: Joi.number().allow(null),
  name: Joi.string().min(2).max(200).required(),
  birthdate: Joi.any(),
  type: Joi.string().min(2).max(200).required(),
  role: Joi.string().min(2).max(200).required(),
  description: Joi.string().min(2).max(200).required(),
  email: Joi.string().min(2).max(200).required(),
  phone: Joi.string().min(2).max(200).required(),
  insurance: Joi.string().min(2).max(200).required(),
  company: Joi.string().min(2).max(200).required(),
})
