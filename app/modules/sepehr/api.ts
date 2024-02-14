import format from "./format";
import helper from "./helper";
// lib
import http, { IHTTPRequestParam } from "@lib/http";
// interfaces
import { IAPIRequestOptions, ISepehrSearchInput } from "./interface";

const endpoint = "https://0.0.0.0";


const search = async (data: ISepehrSearchInput, options: IAPIRequestOptions) => {
	try {
		const requests = options.agencies.map((agency) =>
			helper.requestSearch({
				input: data,
				agency: agency,
				organization: "",
			})
		);

		const responses = await Promise.all(requests);

		const flights = responses
			.filter((response) => response.status == true && response.data && response.data.CharterFlights && Array.isArray(response.data.CharterFlights))
			.flatMap((response, index) => response.data.CharterFlights.map((item: any) => ({ ...item, agency: options.agencies[index], performance: response.code == 1 ? "fast" : "lazy" })));

		return {
			status: true,
			code: 200,
			data: flights,
		};
	} catch (error) {
		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
			data: [],
			debug: error,
		};
	}
};

const revalidate = async (data: any, options: IAPIRequestOptions) => {
	try {
		//
		const result = await http.request({
			method: "post",
			path: "",
			endpoint: endpoint,
			data: data,
			headers: {
				"": "", // authendication
			},
		});
		//
		return result;
	} catch (error) {
		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
			debug: error,
		};
	}
};

const refund = async (data: any, options: IAPIRequestOptions) => {
	try {
		//
		const result = await http.request({
			method: "post",
			path: "",
			endpoint: endpoint,
			data: data,
			headers: {
				"": "", // authendication
			},
		});
		//
		return result;
	} catch (error) {
		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
			debug: error,
		};
	}
};

const reserve = async (data: any, options: IAPIRequestOptions) => {
	try {
		//
		const result = await http.request({
			method: "post",
			path: "",
			endpoint: endpoint,
			data: data,
			headers: {
				"": "", // authendication
			},
		});
		//
		return result;
	} catch (error) {
		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
			debug: error,
		};
	}
};

const issue = async (data: any, options: IAPIRequestOptions) => {
	try {
		//
		const result = await http.request({
			method: "post",
			path: "",
			endpoint: endpoint,
			data: data,
			headers: {
				"": "", // authendication
			},
		});
		//
		return result;
	} catch (error) {
		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
			debug: error,
		};
	}
};

const details = async (data: any, options: IAPIRequestOptions) => {
	try {
		//
		const result = await http.request({
			method: "post",
			path: "",
			endpoint: endpoint,
			data: data,
			headers: {
				"": "", // authendication
			},
		});
		//
		return result;
	} catch (error) {
		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
			debug: error,
		};
	}
};

const ticket = async (data: any, options: IAPIRequestOptions) => {
	try {
		//
		const result = await http.request({
			method: "post",
			path: "",
			endpoint: endpoint,
			data: data,
			headers: {
				"": "", // authendication
			},
		});
		//
		return result;
	} catch (error) {
		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
		};
	}
};

export default {
	search,
	revalidate,
	refund,
	reserve,
	issue,
	details,
	ticket,
};
