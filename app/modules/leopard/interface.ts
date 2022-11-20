import { IModuleDefination } from "@interface/core/module";

export interface IAPIRequestOptions {
	module: IModuleDefination;
}

export interface ILeopardSearchInput {
	flightSteps: {
		originCode: string;
		destinationCode: string;
		departureDate: string;
	}[];
	searchedPassenger: {
		adt: number;
		inf: number;
		chd: number;
	};
	flightPreferences: {
		cabinClass: number;
		tripType: number;
	};
}

export interface ILeoPardAuthInput {
	email: string;
	password: string;
}
