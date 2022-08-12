const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email().max(40).required(),
    password: Joi.string().min(2).max(32).required(),
}).required();
