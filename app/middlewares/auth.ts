import { NextFunction, Request, Response } from "express";
import Joi from "joi";
// database
import auth from "@database/auth";

export const MiddlewareAuthRegisterSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required().min(12),
});

export const MiddlewareAuthLoginSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required().min(12),
});

export const MiddlewareAuthPatchSchema = Joi.object({
	password: Joi.string().required().min(12),
});

export const MiddlewareAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let token: string | undefined = req.headers.authorization || (req.query.token as string);

		
		if (!token) {
			return res.status(401).json({
				status: false,
				code: 401,
				message: "Forbidden",
			});
		}
		
		token = token.replace('Bearer ', '')
		
		const username = await auth.getToken(token);

		if (!username) {
			return res.status(401).json({
				status: false,
				code: 401,
				message: "Forbidden",
			});
		}

		const user = await auth.getUser(username);

		if (!user) {
			return res.status(401).json({
				status: false,
				code: 401,
				message: "Forbidden",
			});
		}

		(req as any).user = username;

		next();
	} catch (error) {
		res.status(500).json({
			status: false,
			code: 500,
			error: -1,
			message: "Unhandled server error",
		});
	}
};
