// import packages
import path from "path";
import colors from "colors/safe";
// import winston
import Winston from "winston";
// get winston config from env
let { WINSTON_DEST, DEBUG } = process.env;
let canDebugMode: boolean = false;

const WINSTON_ENABLE: boolean = WINSTON_DEST != undefined;

if (!WINSTON_DEST) {
	WINSTON_DEST = path.join(__dirname, "..", "..", "logs", "winston");
}

if (DEBUG && ["true", "True", "TRUE", "T", "Y", "yes", "YES"].includes(DEBUG)) {
	canDebugMode = true;
}

const files = {
	info: path.join(WINSTON_DEST as string, "info.log"),
	error: path.join(WINSTON_DEST as string, "error.log"),
};

const format = {
	file: Winston.format.combine(
		Winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		Winston.format.printf(
			(info) =>
				JSON.stringify({
					time: info.timestamp,
					level: info.level,
					message: info.message,
				}) + ","
		)
	),
	console: (color: any, level: string) =>
		Winston.format.combine(
			Winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			Winston.format.printf((info) => {
				if (info.level != level) process.stdout.moveCursor(0, -1);
				return info.level != level ? "\x1b[0G" : `${color(`[${info.level.toUpperCase()}]`)} ${colors.gray(info.timestamp)} ${info.message}`;
			})
		),
};

const transport = {
	file: [
		new Winston.transports.File({
			filename: files.info,
			level: "info",
			format: format.file,
		}),
		new Winston.transports.File({
			filename: files.error,
			level: "error",
			format: format.file,
		}),
	],
	console: [
		new Winston.transports.Console({
			level: "info",
			format: format.console(colors.blue, "info"),
		}),
		new Winston.transports.Console({
			level: "error",
			format: format.console(colors.red, "error"),
		}),
		new Winston.transports.Console({
			level: "debug",
			format: format.console(colors.black, "debug"),
		}),
	],
};

let transports: Winston.transport[] = [...transport.console];
if (WINSTON_ENABLE) {
	transports.push(...transport.file);
}

// Create a new Winston Logger.
export const Logger = Winston.createLogger({
	transports: transports,
});

if (canDebugMode) {
	Logger.log("info", "!!! DEBUG MODE ENABLED !!!");
}

export default Logger;
