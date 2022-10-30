const Joi = require('joi');

const id = Joi.string().uuid();
const price = Joi.number().integer().min(10);
const name = Joi.string().min(3).max(18);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getOneProductSchema = Joi.object({
  id: id.required()
});

const deletProductSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  deletProductSchema,
  getOneProductSchema,
}