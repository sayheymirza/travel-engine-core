import httpLogger from "@lib/http.logger";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import packageJson from "../../package.json";
// validate login middleware
export const MiddlewareValidateBody = (schema: Joi.ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
	const { error, value } = schema.validate(req.body);
	if (error) {
		// error detail in index 0 message replace all '"' with '\''
		const message = error.details[0].message.replace(/"/g, "'");
		return res.json({
			status: false,
			code: 400,
			error: 1,
			message: message,
		});
	}
	req.body = value;
	next();
};

export const MiddlewareLogRequestStart = (req: Request, res: Response, next: NextFunction) => {
	(req as any).timestamp = Date.now();
	(res as any)._json = res.json;
	(res as any).json = (body: any) => {
		(res as any)._body = body;
		next();
	};
	next();
};

export const MiddlewareLogRequestEnd = (req: Request, res: Response, next: NextFunction) => {
	const end = Date.now();

	httpLogger({
		module: {
			id: "travel-engine",
			name: "Travel Engine",
			version: packageJson.version,
		},
		timestamp: {
			start: (req as any).timestamp,
			startedAt: new Date((req as any).timestamp).toISOString(),
			end: end,
			endedAt: new Date(end).toISOString(),
			duration: end - (req as any).timestamp,
		},
		request: {
			url: `${req.protocol}://${req.get("host")}${req.path}`,
			method: req.method,
			data: (req as any).body,
			headers: req.headers,
		},
		response: (res as any)._body,
	});

	(res as any)._json.call(res, (res as any)._body);

	next();
};
