const Joi = require("joi");

exports.ProductVal = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number(),
});
