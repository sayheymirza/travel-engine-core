import { AbstractModule } from "@core/module/abstract";
import { IFormatSearchInput } from "@interface/format";
import api from "./api";
import format from "./format";

export class SepehrController extends AbstractModule {
	public async search(data: IFormatSearchInput) {
		try {
			const res = await api.search(format.fromRequestForSearch(data), {
				module: this.defination!,
			});

			if (res.status == true) {
				return {
					status: true,
					code: 200,
					module: this.defination,
					data: res.data.flatMap((item: any) =>
						format.toResponseOfSearch(item, {
							agancy: item.agancy.code,
							module: this.defination!.id,
							custom: {
								airlineImageEndpoint: "https://flight.logo.travel-engine.ir",
							},
						})
					),
				};
			} else return res;
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
