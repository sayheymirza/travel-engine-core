import { Router } from "express";
import fs from "fs";
import path from "path";
// lib
import { AxiosLogDestination } from "@lib/http.logger";
import { MiddlewareAuth } from "@middlewares/auth";
// middleware

const router = Router();

router.use(MiddlewareAuth);

/**
 * GET /api/v1/log
 * @tags log
 * @summery Get all log folders
 * @security AuthToken
 * @return {Response} 200 - An array of all log folders
 */
router.get("/", (req, res) => {
	res.json({
		status: true,
		code: 200,
		message: "All log folders are here",
		logs: fs.readdirSync(AxiosLogDestination),
	});
});

/**
 * GET /api/v1/log/{date}
 * @tags log
 * @summery Get all log files id by date
 * @security AuthToken
 * @param {string} date.path - Log folder date
 * @return {Response} 200 - An array of all log files
 * @return {Response} 404 - Log folder not exists
 */
router.get("/:date", (req, res) => {
	const { date } = req.params;

	const folder = path.join(AxiosLogDestination, date);

	if (fs.existsSync(folder)) {
		res.json({
			status: true,
			code: 200,
			message: "All log files are here",
			logs: fs.readdirSync(folder).map((item) => item.replace(".json", "")),
		});
	} else {
		res.status(404).json({
			status: false,
			code: 404,
			message: `Log folder with date "${date}" not exists`,
		});
	}
});

/**
 * GET /api/v1/log/{date}/{id}
 * @tags log
 * @summary Get log file by id
 * @security AuthToken
 * @param {string} date.path - Log folder date
 * @param {string} id.path - Log file id
 * @return {object} 200 - Log file data
 * @return {Response} 404 - Log file not exists
 */
router.get("/:date/:id", (req, res) => {
	const { date, id } = req.params;

	const file = path.join(AxiosLogDestination, date, `${id}.json`);

	if (fs.existsSync(file)) {
		const data = fs.readFileSync(file).toString();
		res.json(JSON.parse(data));
	} else {
		res.status(404).json({
			status: false,
			code: 404,
			message: `Log file with id "${id}" in folder with date "${date}" not found`,
		});
	}
});

/**
 * GET /api/v1/log/download/{date}/{id}
 * @tags log
 * @summary Download a log file by id
 * @security AuthToken
 * @param {string} date.path - Log folder name
 * @param {string} id.path - Log file id
 * @return {Response} 200 - Download log file
 * @return {Response} 404 - Log file not exists
 */
router.get("/download/:date/:id", (req, res) => {
	const { date, id } = req.params;

	const file = path.join(AxiosLogDestination, date, `${id}.json`);

	if (fs.existsSync(file)) {
		res.download(file);
	} else {
		res.status(404).json({
			status: false,
			code: 404,
			message: `Log file with id "${id}" in folder with date "${date}" not found`,
		});
	}
});

/**
 * DELETE /api/v1/log/{date}/{id}
 * @tags log
 * @summary Delete a log file by id
 * @security AuthToken
 * @param {string} date.path - Log folder name
 * @param {string} id.path - Log file id
 * @return {Response} 200 - Log file deleted successfully
 * @return {Response} 404 - Log file not exists
 */
router.delete("/:date/:id", (req, res) => {
	const { date, id } = req.params;

	const file = path.join(AxiosLogDestination, date, `${id}.json`);

	if (fs.existsSync(file)) {
		fs.rmSync(file, { force: true });
		res.json({
			status: true,
			code: 200,
			message: "Log file deleted successfully",
		});
	} else {
		res.status(404).json({
			status: false,
			code: 404,
			message: `Log file with id "${id}" in folder with date "${date}" not found`,
		});
	}
});

/**
 * DELETE /api/v1/log/{date}
 * @tags log
 * @summary Delete all log files
 * @security AuthToken
 * @param {string} date.path - Log folder name
 * @return {Response} 200 - All log files deleted successfully
 */
router.delete("/:date", (req, res) => {
	const { date } = req.params;

	const folder = path.join(AxiosLogDestination, date);

	if (fs.existsSync(folder)) {
		fs.rmSync(folder, { force: true, recursive: true });

		res.json({
			status: true,
			code: 200,
			message: "All log folders deleted successfully",
		});
	} else {
		res.status(404).json({
			status: false,
			code: 404,
			message: `Log folder with date "${date}" not exists`,
		});
	}
});

/**
 * DELETE /api/v1/log
 * @tags log
 * @summary Delete all log folders
 * @security AuthToken
 * @return {Response} 200 - All log folders deleted successfully
 */
router.delete("/", (req, res) => {
	fs.rmSync(AxiosLogDestination, { force: true, recursive: true });
	fs.mkdirSync(AxiosLogDestination, { recursive: true });
	res.json({
		status: true,
		code: 200,
		message: "All log folders deleted successfully",
	});
});

export default router;
