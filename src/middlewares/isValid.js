const Joi = require('joi');

const registrationSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .max(50)
    .error(new Error('Email not specified or invalid')),
  password: Joi.string()
    .required()
    .min(6)
    .max(12)
    .error(new Error('Password not specified or invalid')),
  name: Joi.string()
    .min(1)
    .max(8)
    .error(new Error('Name not specified or invalid'))
});

const validateBody = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { validateBody };