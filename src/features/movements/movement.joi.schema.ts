import Joi from 'joi'

/* eslint-disable camelcase */
export const movementSchema = Joi.object({
  id: Joi.number().allow(null),
  move_date: Joi.any().required(),
  action: Joi.string().min(2).max(200).required(),
  number_of_lives: Joi.string().min(1).max(3).required(),
  description: Joi.string().min(2).max(200).required(),
  details: Joi.string().min(2).max(200).required(),
  contract: Joi.string().min(1).max(200).required(),
})
