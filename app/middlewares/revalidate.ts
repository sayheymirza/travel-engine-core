import Joi from "joi";

export const MiddlewareRevalidateSchema = Joi.object({
	searchToken: Joi.string().required(),
	refrenceId: Joi.string().required(),
});
