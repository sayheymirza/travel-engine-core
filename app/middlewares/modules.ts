import Joi from "joi";

export const MiddlewareModuleCreateSchema = Joi.object({
	name: Joi.string().required(),
	version: Joi.string().required(),
});
