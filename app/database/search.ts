import { v4 as uuid } from "uuid";
// interface
import { IFormatSearchInput, IFormatSearchOutput } from "@interface/format";
// lib
import Redis from "@lib/redis";
// search config from env
let { SEARCH_EXPIRE } = process.env;

if (!SEARCH_EXPIRE) {
	SEARCH_EXPIRE = "3600";
}

const set = (input: IFormatSearchInput, output: IFormatSearchOutput[]): string => {
	const token = uuid();

	Redis.setEx(
		`#/travel-engine-core/search/${token}`,
		Number(SEARCH_EXPIRE),
		JSON.stringify({
			input,
			output,
		})
	);

	return token;
};

const get = (token: string) => Redis.get(`#/travel-engine-core/search/${token}`);

export default {
	set,
	get,
};
