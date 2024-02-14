import { IModuleDefination } from "@interface/core/module";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import HTTPLogger from "./http.logger";

export interface IHTTPRequestParam {
	method: "get" | "GET" | "post" | "POST";
	path: string;
	endpoint: string;
	data?: any;
	headers?: any;
	module?: IModuleDefination;
	timeout?: number;
	signal?: any;
}

const request = async (param: IHTTPRequestParam) => {
	const start = Date.now();
	const request: AxiosRequestConfig<any> = {
		url: `${param.endpoint}${param.path}`,
		method: param.method,
		data: param.data,
		headers: param.headers,
		timeout: param.timeout ? param.timeout : undefined,
	};

	let res: AxiosResponse<any, any>;
	let end: number;

	try {
		const _request = { ...request };
		if (param.signal) _request.signal = param.signal;
		res = await axios(_request);
	} catch (error) {
		res = error as any;
	}

	end = Date.now();

	HTTPLogger({
		timestamp: {
			start,
			startedAt: new Date(start).toISOString(),
			end,
			endedAt: new Date(end).toISOString(),
			duration: end - start,
		},
		module: param.module ?? {
			id: "",
			name: "undefined",
			version: "unknown",
		},
		request: request,
		response: res.data,
	});

	return res;
};

export default {
	request,
};
