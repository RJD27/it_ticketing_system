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
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-])(?=^\\S*$).{8,30}$'))
        .required()
        .messages({
            'string.pattern.base': "Password must be between 8 to 30 (inclusive) long. Must contain a lowercase (a), uppercase (A), number (1) and a symbol (*).",
            'string.empty': "Password must not be empty.",
            'any.required': "Password is required",
        }),

    repeatPassword: Joi.ref('password'),
});

exports.ValidateRegister = validator(registerSchema);