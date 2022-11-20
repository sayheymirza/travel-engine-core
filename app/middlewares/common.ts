import Joi from "joi";

export const JoiDateTime = Joi.object({
  year: Joi.number().required(),
  month: Joi.number().required().min(1).max(12),
  day: Joi.number().required().min(1).max(31),
  format: Joi.string()
    .valid("jalali", "gregorian")
    .required()
    .default("jalali"),
}).required();

export const JoiLocation = Joi.object({
  value: Joi.string().required(),
  text: Joi.string(),
}).required();
