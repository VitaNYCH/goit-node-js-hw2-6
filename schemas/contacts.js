const Joi = require("joi");

const validName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const validPhone =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const addSchemaPost = Joi.object({
  name: Joi.string().min(2).max(15).pattern(new RegExp(validName)).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(5).pattern(new RegExp(validPhone)).required(),
});

const addSchemaPut = Joi.object({
  name: Joi.string().min(2).max(15).pattern(new RegExp(validName)),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(5).pattern(new RegExp(validPhone)),
});

module.exports = {
  addSchemaPost,
  addSchemaPut,
};
