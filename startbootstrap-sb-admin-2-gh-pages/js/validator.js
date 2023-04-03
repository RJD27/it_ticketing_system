const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const registerSchema = Joi.object({
  firstName: Joi.string()
  .alphanum()
  .min(1)
  .max(30)
  .required()
  .messages({
    "string.min": " First name must have atleast one character. ",
    "string.empty": " First name must have atleast one character. ",
    "any.required": " First name is required. "
  }),

  lastName: Joi.string()
  .alphanum()
  .min(1)
  .max(30)
  .required()
  .messages({
    "string.min": " Last name must have atleast one character. ",
    "string.empty": " Last name must have atleast one character. ",
    "any.required": " Last name is required. "
  }),

  email: Joi.string()
  .email()
  .required()
  .messages({
    "string.email": " Email is not valid. ",
    "string.empty": " Email must not be empty. ",
    "any.required": " Email is required. "
  }),

  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-])(?=^\\S*$).{8,30}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        " Password must be between 8 to 30 (inclusive) long, containing a lowercase (a), uppercase (A), number (1) and a symbol (*). ",
      "string.empty": " Password must not be empty. ",
      "any.required": " Password is required. ",
    }),

  repeatPassword: Joi.string()
  .required()
  .valid(Joi.ref("password"))
  .messages({
    "any.only": " Passwords must match. "
  }),
});

exports.ValidateRegister = validator(registerSchema);
