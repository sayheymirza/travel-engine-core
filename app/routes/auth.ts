import { Router } from "express";
import { v4 as uuid } from "uuid";
// database
import auth from "@database/auth";
// lib
import bcrypt from "@lib/bcrypt";
// middleware
import { MiddlewareValidateBody } from "@core/middleware";
import { MiddlewareAuth, MiddlewareAuthLoginSchema, MiddlewareAuthPatchSchema, MiddlewareAuthRegisterSchema } from "@middlewares/auth";
import moment from "jalali-moment";

const router = Router();

/**
 * POST /api/v1/auth/register
 * @tags auth
 * @summary Register a new Travel Engine Core user
 * @security AuthToken
 * @param {string} username.form.required - User name - application/x-www-form-urlencoded
 * @param {string} password.form.required - User password - application/x-www-form-urlencoded
 * @param {User} request.body.required - User data - application/json
 * @return {Response} 200 - Hello new Travel Engine Core user
 * @return {Response} 400 - Ths user with this username is exists
 * @return {Response} 500 - Unhandled server error
 */
router.post("/register", MiddlewareValidateBody(MiddlewareAuthRegisterSchema), async (req, res) => {
	try {
		let { username, password } = req.body;

		const user = await auth.getUser(username);

		if (user) {
			res.status(400).json({
				status: false,
				code: 400,
				error: 99,
				message: "This user with this username is exists",
			});
		} else {
			password = await bcrypt.hashPassword(password);
			await auth.setUser({ username, password });
			res.json({
				status: true,
				code: 200,
				message: "Hello new Travel Engine Core user",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: false,
			code: 500,
			error: 0,
			message: "Unhandled server error",
			debug: error,
		});
	}
});

/**
 * POST /api/v1/auth/login
 * @tags auth
 * @summary Login and get a access token
 * @param {string} username.form.required - User name - application/x-www-form-urlencoded
 * @param {string} password.form.required - User password - application/x-www-form-urlencoded
 * @param {User} request.body.required - User data - application/json
 * @return {Response} 200 - Welcome Travel Engine Core user
 * @return {Response} 400 - Bad user
 * @return {Response} 500 - Unhandled server error
 */
router.post("/login", MiddlewareValidateBody(MiddlewareAuthLoginSchema), async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await auth.getUser(username);

		if (!user) {
			res.status(400).json({
				status: false,
				code: 400,
				message: "Bad user",
			});
		} else if ((await bcrypt.comparePassword(password, user.password)) == false) {
			res.status(400).json({
				status: false,
				code: 400,
				message: "Bad user",
			});
		} else {
			const token = uuid();
			const start = moment();
			const end = moment().add(auth.expire, "s");
			const duration = moment.duration(end.diff(start));
			await auth.setToken(token, username);
			res.json({
				status: true,
				code: 200,
				message: "Welcome Travel Engine Core user",
				data: {
					token: token,
					remaining: Math.floor(duration.asHours()) + "h",
					start: start.utc(),
					end: end.utc(),
				},
			});
		}
	} catch (error) {
		res.status(500).json({
			status: false,
			code: 500,
			error: 0,
			message: "Unhandled server error",
			debug: error,
		});
	}
});

/**
 * GET /api/v1/auth
 * @tags auth
 * @summary Get Travel Engine Core user info
 * @security AuthToken
 * @return {Response} 200 - This is you in Travel Engine Core
 * @return {Response} 400 - Bad user
 * @return {Response} 401 - Forbidden
 * @return {Response} 500 - Unhandled server error
 */
router.get("/", MiddlewareAuth, async (req, res) => {
	try {
		const username = (req as any).user;
		const user = await auth.getUser(username);

		if (!user) {
			res.status(400).json({
				status: false,
				code: 400,
				message: "Bad user",
			});
		} else {
			res.json({
				status: true,
				code: 200,
				message: "This is you in Travel Engine Core",
				data: user,
			});
		}
	} catch (error) {
		res.status(500).json({
			status: false,
			code: 500,
			error: 0,
			message: "Unhandled server error",
			debug: error,
		});
	}
});

/**
 * PATCH /api/v1/auth
 * @tags auth
 * @summary Patch Travel Engine Core user
 * @security AuthToken
 * @param {string} password.form.required - User password - application/x-www-form-urlencoded
 * @param {PatchUser} request.body.required - Patch user data - application/json
 * @return {Response} 200 - Patch submited successfully
 * @return {Response} 401 - Forbidden
 * @return {Response} 500 - Unhandled server error
 */
router.patch("/", MiddlewareAuth, MiddlewareValidateBody(MiddlewareAuthPatchSchema), async (req, res) => {
	try {
		const username = (req as any).user;
		let { password } = req.body;

		password = await bcrypt.hashPassword(password);
		await auth.setUser({ username, password });

		res.json({
			status: true,
			code: 200,
			message: "Patch submited successfully",
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			code: 500,
			error: 0,
			message: "Unhandled server error",
			debug: error,
		});
	}
});

/**
 * DELETE /api/v1/auth/{username}
 * @tags auth
 * @summary Delete Travel Engine Core user
 * @security AuthToken
 * @param {string} username.path.required - User name
 * @return {Response} 200 - Travel Engine Core user killed successfully
 * @return {Response} 400 - Bad user
 * @return {Response} 401 - Forbidden
 * @return {Response} 500 - Unhandled server error
 */
router.delete("/:username", MiddlewareAuth, async (req, res) => {
	try {
		const { username } = req.params;

		const user = await auth.getUser(username);

		if (!user) {
			res.status(400).json({
				status: false,
				code: 400,
				message: "Bad user",
			});
		} else {
			await auth.deleteUser(username);

			res.json({
				status: true,
				code: 200,
				message: "Travel Engine Core user killed successfully",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: false,
			code: 500,
			error: 0,
			message: "Unhandled server error",
			debug: error,
		});
	}
});

/**
 * A User
 * @typedef {object} User
 * @property {string} username.required - User name
 * @property {string} password.required - User password
 */

/**
 * Update User
 * @typedef {object} PatchUser
 * @property {string} password.required - User password
 */

export default router;
