import Joi from 'joi'

/* eslint-disable camelcase */
export const contractSchema = Joi.object({
  id: Joi.number().allow(null),
  policy: Joi.string().min(2).max(200).required(),
  size: Joi.string().min(2).max(200).required(),
  type: Joi.string().min(2).max(200).required(),
  version: Joi.number().required(),
  number_of_lives: Joi.number().required(),
  validity_start: Joi.any().required(),
  validity_end: Joi.any().required(),
  validity_time: Joi.number().required(),
  inclusion_period: Joi.string().min(2).max(200).required(),
  cutoff_date: Joi.string().min(2).max(200).required(),
  email_on_insurancy: Joi.string()
    .max(250)
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  phone_on_insurancy: Joi.string().min(2).max(200).required(),
  copay: Joi.boolean().required(),
  adhesion: Joi.boolean().required(),
  copay_perc: Joi.number().required(),
  contributor_perc: Joi.number().required(),
  copay_details: Joi.string().min(2).max(200).required(),
  cost: Joi.number().required(),
  invoice_amount: Joi.number().required(),
  total_contract_value: Joi.number().required(),
  first_invoice_date: Joi.string().min(2).max(200).required(),
})
