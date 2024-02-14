import api from "./api";
import format from "./format";
import helper from "./helper";
// core
import { AbstractModule } from "@core/module/abstract";
// lib
import { IFormatSearchInput } from "@interface/format";
import mongo from "@lib/mongo";
// database
import searchDB from "@database/search";
// interface
import { IResponse } from "@interface/common";
import Logger from "@lib/logger";
// get sepehr client config from env
const { MONGO_SEPEHR } = process.env;

export class SepehrController extends AbstractModule {
	constructor() {
		super();

		this.connectToDatabase();
	}

	private connectToDatabase() {
		if (MONGO_SEPEHR) {
			mongo.connect(MONGO_SEPEHR);
		} else {
			Logger.error("Sepehr module need a mongodb client");
		}
	}

	public async search(data: IFormatSearchInput, token: string | undefined): Promise<IResponse> {
		try {
			const res = await api.search(format.fromRequestForSearch(data), {
				module: this.defination!,
				agencies: await helper.getAgencies(),
			});

			if (res.status == true) {
				const data = res.data.flatMap((item: any) =>
					format.toResponseOfSearch(item, {
						agency: item.agency.code,
						module: this.defination!.id,
						custom: {
							airlineImageEndpoint: "https://flight.logo.travel-engine.ir",
						},
						performance: item.performance,
					})
				);
				if (token)
					searchDB.push(
						token,
						{
							status: "success",
							defination: this.defination!,
						},
						data
					);

				return {
					status: true,
					code: 200,
					data: data,
				};
			}
		} catch (error) {}
		if (token)
			searchDB.push(
				token,
				{
					status: "faild",
					defination: this.defination!,
				},
				[]
			);

		return {
			status: false,
			code: 500,
			data: [],
		};
	}

	public async revalidate(refrence: string) {
		try {
			return {
				status: true,
				code: 200,
				module: this.defination,
				data: [],
			};
		} catch (error) {
			return {
				status: false,
				code: 500,
				error: 0,
				message: "Unhandled server error",
				debug: error,
			};
		}
	}

	public async refund() {
		try {
			return {
				status: true,
				code: 200,
				module: this.defination,
				data: [],
			};
		} catch (error) {
			return {
				status: false,
				code: 500,
				error: 0,
				message: "Unhandled server error",
				debug: error,
			};
		}
	}

	public async reserve() {
		try {
			return {
				status: true,
				code: 200,
				module: this.defination,
				data: [],
			};
		} catch (error) {
			return {
				status: false,
				code: 500,
				error: 0,
				message: "Unhandled server error",
				debug: error,
			};
		}
	}

	public async issue() {
		try {
			return {
				status: true,
				code: 200,
				module: this.defination,
				data: [],
			};
		} catch (error) {
			return {
				status: false,
				code: 500,
				error: 0,
				message: "Unhandled server error",
				debug: error,
			};
		}
	}

	public async details() {
		try {
			return {
				status: true,
				code: 200,
				module: this.defination,
				data: [],
			};
		} catch (error) {
			return {
				status: false,
				code: 500,
				error: 0,
				message: "Unhandled server error",
				debug: error,
			};
		}
	}

	public async ticket() {
		try {
			return {
				status: true,
				code: 200,
				module: this.defination,
				data: [],
			};
		} catch (error) {
			return {
				status: false,
				code: 500,
				error: 0,
				message: "Unhandled server error",
				debug: error,
			};
		}
	}
}
