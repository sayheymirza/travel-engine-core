// lib
import http from "@lib/http";
import format from "./format";
// interfaces
import { IAPIRequestOptions, ISepehrSearchInput } from "./interface";

const endpoint = "https://0.0.0.0";

const agancies = [
	{
		name: "sepehr-test",
		code: "1",
		endpoint: "http://45.156.186.30:5831/https://SepehrApiTest.ir",
		username: "yahaghi",
		password: "8f69c378b617f162c0d82c5ef41fa120",
	},
];

const auth = async (data: any) => {
	try {
		//
		const result = await http.request({
			method: "get",
			path: "",
			endpoint: endpoint,
			data: data,
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

const search = async (data: ISepehrSearchInput, options: IAPIRequestOptions) => {
	try {
		const requests = agancies.map((agancy) => {
			return http.request({
				method: "post",
				path: "/api/Partners/Flight/Availability/V12/SearchByRouteAndDate",
				endpoint: agancy.endpoint,
				data: {
					UserName: agancy.username,
					Password: agancy.password,
					...data,
				},
			});
		});

		const responses = await Promise.all(requests);

		const flights = responses.flatMap((response, index) => response.data.CharterFlights.map((item: any) => ({ ...item, agancy: agancies[index] })));

		return {
			status: true,
			code: 200,
			message: undefined,
			data: flights,
		};
	} catch (error) {
		console.log(error);
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
	auth,
	search,
	revalidate,
	refund,
	reserve,
	issue,
	details,
	ticket,
};
