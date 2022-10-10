import Joi from 'joi'

/* eslint-disable camelcase */
export const usersSchema = Joi.object({
  username: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().alphanum().min(8).max(20).required(),
})
