import fs from "fs";
import moment from "jalali-moment";
import path from "path";
import prettier from "prettier";
// interface
import { IModuleDefination } from "@interface/core/module";
// get http request logger config from env
let { AXIOS_DEST } = process.env;

if (!AXIOS_DEST) {
	AXIOS_DEST = path.join(__dirname, "..", "..", "logs", "axios");
}

export const AxiosLogDestination = AXIOS_DEST;

if (fs.existsSync(AXIOS_DEST) == false) {
	fs.mkdirSync(AXIOS_DEST, { recursive: true });
}

export interface IHTTPLoggerParam {
	timestamp: {
		start: number;
		startedAt: string;
		end: number;
		endedAt: string;
		duration: number;
	};
	module: IModuleDefination;
	response: any;
	request: any;
}

export default (param: IHTTPLoggerParam): string => {
	const id = Date.now().toString();
	const date = moment().format("YYYY-MM-DD");

	const data = JSON.stringify({
		timestamp: param.timestamp,
		module: param.module,
		request: param.request,
		response: param.response,
	});

	const dest = path.join(AXIOS_DEST as string, date);
	const output = path.join(dest, `${id}.json`);

	if (fs.existsSync(dest) == false) {
		fs.mkdirSync(dest);
	}

	fs.writeFileSync(output, prettier.format(data, { parser: "json" }));

	return id;
};
