// lib
import http from "@lib/http";
import helper from "./helper";
// interfaces
import { IAPIRequestOptions, ILeoPardAuthInput, ILeopardSearchInput } from "./interface";

const endpoint = "https://liveservice.leopard.travel";

const auth = async (data: ILeoPardAuthInput) => {
	try {
		//
		const result = await http.request({
			method: "post",
			path: "/gateway/identity/get-token",
			endpoint: endpoint,
			data: data,
		});
		//
		return {
			status: result.status == 200,
			code: result.status,
			error: result.status != 200 ? 2 : undefined,
			message: result.status != 200 ? "Api request has error" : undefined,
			data: result.status == 200 ? result.data : undefined,
			debug: result.data,
		};
	} catch (error) {
		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
		};
	}
};

const search = async (data: ILeopardSearchInput, options: IAPIRequestOptions) => {
	try {
		//
		const result = await http.request({
			method: "post",
			path: "/gateway/flight/search",
			endpoint: endpoint,
			data: data,
			headers: {
				Authorization: await helper.getToken(), // authendication
			},
			module: options.module,
		});
		//
		return {
			status: result.status == 200,
			code: result.status,
			error: result.status != 200 ? 2 : undefined,
			message: result.status != 200 ? "Api request has error" : undefined,
			data: result.status == 200 ? result.data : undefined,
			debug: result.data,
		};
	} catch (error) {
		console.log(error);

		return {
			status: false,
			code: 500,
			error: 1,
			message: "Api request faild",
			data: undefined,
			debug: error,
		};
	}
};

const revalidate = async (data: any, options: IAPIRequestOptions) => {
	try {
		//

		const result = await http.request({
			method: "get",
			path: `/gateway/flight/revalidate?SearchKey=${data.SearchKey}&LeoRefrenceID=${data.LeoRefrenceId}`,
			endpoint: endpoint,
			data: {},
			headers: {
				Authorization: await helper.getToken(), // authendication
			},
		});
		//

		return {
			status: result.status == 200,
			code: result.status,
			error: result.status != 200 ? 2 : undefined,
			message: result.status != 200 ? "Api request has error" : undefined,
			data: result.status == 200 ? result.data : undefined,
			debug: result.data,
		};
	} catch (error) {
		console.log(error);
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
			method: "get",
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
	auth,
	search,
	revalidate,
	refund,
	reserve,
	issue,
	details,
	ticket,
};
