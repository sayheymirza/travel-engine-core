import { Router } from "express";
// middleware
import { MiddlewareValidateBody } from "@core/middleware";
import { MiddlewareRevalidateSchema } from "@middlewares/revalidate";
// core
import Module from "@core/module/parrent";

const router = Router();

/**
 * POST /api/v1/revalidate
 * @tags revalidate
 * @summary Revalidate from modules
 * @param {string} refrenceId.form.required - Refrence Id of itin - application/x-www-form-urlencoded
 * @param {string} searchToken.form.required - Token of your search - application/x-www-form-urlencoded
 * @param {RevalidateInput} request.body.required Revalidate input data - application/json
 * @return {Response} 200 - Revalidate result
 */
router.post("/", MiddlewareValidateBody(MiddlewareRevalidateSchema), async (req, res) => {
	try {
		const input = req.body;

		// ask for what module have to revalidate and use

		const result = await Module.revalidate({
			searchToken: input.searchToken,
			refrenceId: input.refrenceId,
		});

		res.json({
			status: true,
			code: 200,
			data: result.data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: false,
			code: 500,
			error: 1,
			message: "Unhandled server error",
		});
	}
});

/**
 * Format Revalidate Input
 * @typedef {object} RevalidateInput
 * @property {string} refrenceId.required - refrenceId of itin
 * @property {string} searchToken.required - searchToken of your search

 */

export default router;
