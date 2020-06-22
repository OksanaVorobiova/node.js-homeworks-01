import Joi from "@hapi/joi";

const contactValidSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(/.+@.+\..+/)
    .required(),
  phone: Joi.string()
    .pattern(/^\((\d{3})\)?[ ]?\d{3}[-]?\d{4}/)
    .required(),
  subscription: Joi.string().valid("free", "pro", "premium").required(),
  password: Joi.string(),
  token: Joi.string(),
});

const validateClientData = (req, res, next) => {
  const { error } = contactValidSchema.validate(req.body);
  if (error) {
    {
      res.status(400).json({
        message: `missing required ${error.details[0].context.key} field or data in this field is invalid`,
      });
    }
    return;
  }
  next();
};

export default validateClientData;
