const {Schema, model} = require('mongoose');
const Joi = require("joi");
const { handelMongooseError } = require('../helpers');

const validName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const validPhone =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;


const contactSchema = new Schema({
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },    
},
  {versionKey:false, timestamps:true}
);



const addSchemaPost = Joi.object({
    name: Joi.string().min(2).max(15).pattern(new RegExp(validName)).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net","uk"] } })
      .required(),
    phone: Joi.string().min(5).pattern(new RegExp(validPhone)).required(),
    favorite: Joi.boolean().required(),
  });
  
  const addSchemaPut = Joi.object({
    name: Joi.string().min(2).max(15).pattern(new RegExp(validName)),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().min(5).pattern(new RegExp(validPhone)),
    favorite: Joi.boolean(),
  });

contactSchema.post("save",handelMongooseError);

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchemaPost,
    addSchemaPut,
    updateFavoriteSchema
};

const Contact = model("contact", contactSchema);
module.exports = {
    Contact,
    schemas,
}