const Joi = require('@hapi/joi');

function validateClientData(req, res) {
    const schema = Joi.object({
        name: Joi.required(),
        email: Joi.required(),
        phone: Joi.required()
      });
    const result = schema.validate(req.body);
    return result
}

module.exports = validateClientData;
