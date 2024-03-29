import api from "./api";
import format from "./format";
// interfaces
import { IFormatSearchInput } from "@interface/format";
// core
import { AbstractModule } from "@core/module/abstract";
// database
import searchDB from "@database/search";
import { IResponse } from "@interface/common";

export class LeopardController extends AbstractModule {
	public async search(data: IFormatSearchInput, token: string | undefined): Promise<IResponse> {
		try {
			const res = await api.search(format.fromRequestForSearch(data), {
				module: this.defination!,
			});

			if (res.status == true) {
				const data = res.data.result.pricedItineraries.map((item: any) =>
					format.toResponseOfSearch(item, {
						module: this.defination!.id,
						custom: {
							airlineImageEndpoint: "https://flight.logo.travel-engine.ir",
							suffix: res.data.result.searchKey,
						},
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
			const revalidateData = refrence.split("#");

			const refrenceId = revalidateData[0];
			// leopard search key ; not ours
			const searchKey = revalidateData[1];

			const res = await api.revalidate(
				{
					SearchKey: searchKey,
					LeoRefrenceId: refrenceId,
				},
				{
					module: this.defination!,
				}
			);

			return {
				status: true,
				code: 200,
				module: this.defination,
				data: format.toResponseOfSearch(res.data.result.pricedItinerary, {
					module: this.defination!.id,
					custom: {
						airlineImageEndpoint: "https://flight.logo.travel-engine.ir",
						suffix: searchKey,
					},
				}),
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
