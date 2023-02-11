const Joi = require('joi');

const validator = (schema) => (payload) => 
schema.validate(payload, { abortEarly: false });

const registerSchema = Joi.object({
    firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    email: Joi.string()
    .email()
    .required(),

    password: Joi.string()
    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-])(?=^\\S*$).{8,30}$')),

    repeatPassword: Joi.ref('password'),
});

exports.validateRegister = validator(registerSchema);