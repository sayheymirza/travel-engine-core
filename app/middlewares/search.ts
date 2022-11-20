import Joi from "joi";
import { JoiDateTime, JoiLocation } from "./common";

export const MiddlewareSearchSchema = Joi.object({
	trip: Joi.string().valid("go", "go-back").required(),
	passengers: Joi.object({
		adult: Joi.number().required().min(1).default(1),
		child: Joi.number().default(0),
		infant: Joi.number().default(0),
	}).required(),
	ways: Joi.array()
		.items(
			Joi.object({
				departure: JoiDateTime,
				origin: JoiLocation,
				destination: JoiLocation,
			})
		)
		.required()
		.min(1),
});
