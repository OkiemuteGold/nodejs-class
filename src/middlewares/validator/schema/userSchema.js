import Joi from "joi";

export const signUpSchema = Joi.object().keys({
  first_name: Joi.string()
    .regex(/^[A-Za-z]{2,}$/)
    .trim()
    .required(),
  last_name: Joi.string()
    .regex(/^[A-Za-z]{2,}$/)
    .trim()
    .required(),
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
    .message(
      "password must contain at least 1 uppercase, 1 lowercase, 1 number"
    ),
  address: Joi.string().trim().required(),
});
export const loginSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().min(3).required(),
});
