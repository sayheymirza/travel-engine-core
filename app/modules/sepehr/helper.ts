import { ISepehrAgency, ISepehrSearchRequestInput } from "./interface";
import database from "./database";
import cronjob from "./cronjob";
import http from "@lib/http";
// sepehr config from env
const { SEPEHR_REQUEST_SEARCH_TIMEOUT } = process.env;

const getAgencies = async (): Promise<ISepehrAgency[]> => {
	try {
		const result = await database.agency.find({ active: true }).exec();
		return result.map((item) => ({ code: item.code, name: item.name, endpoint: item.endpoint, username: item.public ? "public" : item.username, password: item.public ? "" : item.password }));
	} catch (error) {
		return [];
	}
};

const getAgancy = async (code: string): Promise<ISepehrAgency | undefined> => {
	try {
		const item = await database.agency.findOne({ code, active: true }).exec();
		if (item)
			return {
				code: item.code,
				name: item.name,
				endpoint: item.endpoint,
				username: item.public ? "public" : item.username,
				password: item.public ? "" : item.password,
			};
		else return undefined;
	} catch (error) {
		return undefined;
	}
};

const requestSearch = (input: ISepehrSearchRequestInput, isCronjob: boolean = false): Promise<any> => {
	return new Promise<any>(async (resolve) => {
		try {
			let timeout: any;
			const key = cronjob.GenerateKey(input);
			const controller = new AbortController();

			// if request for search was not from cronjob
			if (isCronjob == false) {
				// get data if was in cronjob
				const data = await cronjob.GetFromCronjob(key);

				if (data) {
					return resolve({
						status: true,
						code: 2, // 2 = from cronjob
						data: data.output,
					});
				}

				timeout = setTimeout(() => {
					controller.abort();
					// push to cronjob
					cronjob.AddToCronjob({
						key: key,
						config: {
							organization: input.organization,
							agency: input.agency.code,
						},
						input: input.input,
					});
					// resolve fake result
					resolve({
						status: false,
						data: null,
					});
				}, Number(SEPEHR_REQUEST_SEARCH_TIMEOUT) || 5000);
			}

			const agency = typeof input.agency == "string" ? await getAgancy(input.agency as any) : input.agency;

			if (!agency) {
				return resolve({
					status: false,
					data: null,
				});
			}

			const result = await http.request({
				method: "post",
				path: "/api/Partners/Flight/Availability/V12/SearchByRouteAndDate",
				endpoint: agency.endpoint,
				data: {
					UserName: agency.username,
					Password: agency.password,
					...input.input,
				},
				signal: controller.signal,
			});

			if (isCronjob == false) clearTimeout(timeout);

			if (result.status == 200) {
				resolve({
					status: true,
					code: 1, // from api
					data: result.data,
				});
			} else {
				resolve({
					status: false,
					data: null,
				});
			}
		} catch (error) {
			resolve({
				status: false,
				data: null,
			});
		}
	});
};

export default {
	getAgencies,
	requestSearch,
};
