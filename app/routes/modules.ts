import { Router } from "express";
// modules
import Modules from "@modules/index";
// middleware
import { MiddlewareValidateBody } from "@core/middleware";
import { MiddlewareModuleCreateSchema } from "@middlewares/modules";
import { MiddlewareAuth } from "@middlewares/auth";
// cli
import { createModule } from "cli/create-module";

const router = Router();

/**
 * GET /api/v1/module
 * @tags module
 * @summary Get a list of installed modules
 * @return {Response} 200 - All installed modules
 * @example response - 200 - Response of all installed modules
 * {
 *  "status": true,
 *  "code": 200,
 *  "message": "This is all install modules",
 *  "count": 0,
 *  "modules": []
 * }
 */
router.get("/", (_req, res) => {
	const modules = Object.values(Modules).map((item) => {
		const defination = (item as any).defination;

		return {
			id: defination.name.split(" ").join("-"),
			...defination,
		};
	});
	res.json({
		status: true,
		code: 200,
		message: "This is all installed modules",
		count: modules.length,
		modules: modules,
	});
});

/**
 * POST /api/v1/module
 * @tags module
 * @summary Create a new module with necessary files
 * @security AuthToken
 * @param {string} name.form.required - Module name - application/x-www-form-urlencoded
 * @param {string} version.form.required - Module version - application/x-www-form-urlencoded
 * @param {Module} request.body.required - Module defination data - application/json
 * @return {Response} 200 - Module created successfully
 * @return {Response} 400 - Validation data in body faild
 * @return {Response} 401 - Forbidden
 * @return {Response} 409 - Module name exists
 */
router.post("/", MiddlewareAuth, MiddlewareValidateBody(MiddlewareModuleCreateSchema), (req, res) => {
	const { name, version } = req.body;

	const result = createModule(name, version);

	res.status(result.code).json(result);
});

/**
 * An installed module
 * @typedef {object} Module
 * @property {string} name.required - Module name
 * @property {string} version.required - Module version
 */

export default router;
