import { IModuleDefination } from "@interface/core/module";

export interface ISepehrAgency {
	code: string;
	name: string;
	endpoint: string;
	username: string;
	password: string;
}

export interface IAPIRequestOptions {
	module: IModuleDefination;
	agencies: ISepehrAgency[];
}

export interface ISepehrSearchInput {
	OriginIataCode: string;
	DestinationIataCode: string;
	DepartureDate: string;
	ReturningDate: string | null;
	FetchSupplierWebserviceFlights: boolean;
	FetchFlighsWithBookingPolicy: boolean;
	Language: string;
}

export interface ISepehrSearchRequestInput {
	input: ISepehrSearchInput;
	organization: string;
	agency: ISepehrAgency;
}