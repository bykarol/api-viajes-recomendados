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

const pwdSchema = Joi.object({
  password: Joi.string()
  .required()
  .min(6)
  .max(12)
  .error(new Error('Password not specified or invalid'))
});

const userUpdateSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(50)
    .error(new Error('Name not specified or invalid')),
  email: Joi.string()
    .required()
    .email()
    .max(50)
    .error(new Error('Email not specified or invalid'))
});
//params
const idSchema = Joi.object({
  id: Joi.number()
  .integer()
  .positive()
  .required()
  .error(new Error('ID not specified or invalid'))
});

const regCodeSchema = Joi.object({
  regCode: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .error(new Error('Registration Code not specified or invalid')),
});

const citySchema = Joi.object({
  city: Joi.string()
    .required()
    .min(1)
    .max(50)
    .pattern(/^[^0-9]*$/)
    .error(new Error('City not specified or invalid'))
});
const countrySchema = Joi.object({
  country: Joi.string()
    .required()
    .min(1)
    .max(50)
    .pattern(/^[^0-9]*$/)
    .error(new Error('City not specified or invalid'))
});

const validateBody = (req, res, next) => {
  if (req.body.password && req.body.email && req.body.name) {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
} else if(req.body.name && req.body.email) {
  const { error } = userUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
}else if(req.body.password) {
  const { error } = pwdSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
}
  next();
};

const validateParams = (req, res, next) => {
  if(req.params.id){
    const { error } = idSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
  }else if(req.params.regCode){
    const { error } = regCodeSchema.validate(req.params);
    if (error) {
      return console.log(res.status(400).json({ message: error.message }));
    }
  }else if (req.params.city ) {
    const { error } = citySchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
  }else if (req.params.country ) {
    const { error } = countrySchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  next();
};
module.exports = { validateBody, validateParams };