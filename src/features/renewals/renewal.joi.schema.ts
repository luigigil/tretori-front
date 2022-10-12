import Joi from 'joi'

/* eslint-disable camelcase */
export const renewalSchema = Joi.object({
  id: Joi.number().allow(null),
  proposed_date: Joi.any().required(),
  proposed_adjustment: Joi.string().min(2).max(200).required(),
  closed_date: Joi.any().required(),
  closed_value: Joi.string().min(2).max(200).required(),
  details: Joi.string().min(2).max(200).required(),
  contract: Joi.string().min(1).max(200).required(),
})
