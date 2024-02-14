import { v4 as uuid } from "uuid";
// interface
import { IFormatSearchInput, IFormatSearchOutput } from "@interface/format";
import { IDBSearch, IDBSearchForce, IDBSearchModule } from "@interface/database/search";
// lib
import Redis from "@lib/redis";
import { IModuleDefination } from "@interface/core/module";
import { ITimestamp } from "@interface/common";
// search config from env
let { SEARCH_EXPIRE } = process.env;

if (!SEARCH_EXPIRE) {
	SEARCH_EXPIRE = "3600";
}

const setForce = async (param: IDBSearchForce): Promise<IDBSearch> => {
	const token = uuid();

	const start = Date.now();
	const end = new Date(); // expire end at

	end.setSeconds(end.getSeconds() + Number(SEARCH_EXPIRE));

	const expire = {
		start: start,
		startedAt: new Date(start).toISOString(),
		end: end.getTime(),
		endedAt: end.toISOString(),
		duration: Number(SEARCH_EXPIRE),
	};

	const timestamp = {
		start: param.start,
		startedAt: new Date(param.start).toISOString(),
		end: end.getTime(),
		endedAt: end.toISOString(),
		duration: end.getTime() - param.start,
	};

	const data: IDBSearch = {
		count: param.output.length,
		status: "done",
		expire: expire,
		timestamp,
		modules: param.modules.map((item) => ({
			status: "success",
			timestamp,
			defination: item,
		})),
		input: param.input,
		output: param.output,
	};

	await Redis.setex(`#/travel-engine-core/search/${token}`, Number(SEARCH_EXPIRE), JSON.stringify(data));

	return data;
};

const set = async (modules: IModuleDefination[], input: IFormatSearchInput): Promise<{ token: string; expire: ITimestamp }> => {
	const token = uuid();

	const start = Date.now();
	const end = new Date(); // expire end at

	end.setSeconds(end.getSeconds() + Number(SEARCH_EXPIRE));

	const expire = {
		start: start,
		startedAt: new Date(start).toISOString(),
		end: end.getTime(),
		endedAt: end.toISOString(),
		duration: Number(SEARCH_EXPIRE),
	};

	try {
		await Redis.setex(
			`#/travel-engine-core/search/${token}`,
			Number(SEARCH_EXPIRE),
			JSON.stringify({
				count: 0,
				status: "fetch",
				expire: expire,
				timestamp: {
					start: start,
					startedAt: new Date(start).toISOString(),
					end: 0,
					endedAt: "",
					duration: 0,
				},
				modules: modules.map((item) => ({
					status: "fetch",
					defination: item!,
					timestamp: {
						start: start,
						startedAt: new Date(start).toISOString(),
						end: 0,
						endedAt: "",
						duration: 0,
					},
				})),
				input: input,
				output: [],
			})
		);
	} catch (error) {
		console.log(error);
	}

	return { token, expire };
};

const get = async (token: string): Promise<IDBSearch | null> => {
	try {
		const data = await Redis.get(`#/travel-engine-core/search/${token}`);
		if (typeof data == "string") {
			return JSON.parse(data);
		}
		return null;
	} catch (error) {
		return null;
	}
};

const push = async (token: string, module: IDBSearchModule, output: IFormatSearchOutput[]) => {
	try {
		const data = await get(token);
		if (data == null) {
			return false;
		}

		const index = data.modules.findIndex((item) => item.defination.id == module.defination.id);

		if (index == -1) {
			return false;
		}

		const end = Date.now();

		data.modules[index] = {
			...module,
			timestamp: {
				...data.modules[index].timestamp,
				end: end,
				endedAt: new Date(end).toISOString(),
				duration: end - data.modules[index].timestamp!.start!,
			},
		};

		// check all modules are not fetching any more
		if (data.modules.every((item) => item.status != "fetch")) {
			data.timestamp = {
				...data.timestamp,
				end: end,
				endedAt: new Date(end).toISOString(),
				duration: end - data.timestamp!.start!,
			};
			data.status = "done";
		}

		data.output.push(...output);

		data.count = data.output.length;

		Redis.set(`#/travel-engine-core/search/${token}`, JSON.stringify(data));

		return true;
	} catch (error) {
		return false;
	}
};

export default {
	setForce,
	set,
	get,
	push,
};
