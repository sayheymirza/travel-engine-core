export interface IAPIRequestOptions {
    
}

export interface IFaranegerSearchInput {
	OriginIataCode: string;
	DestinationIataCode: string;
	DepartureDate: string;
	ReturningDate: string | null;
	FetchSupplierWebserviceFlights: boolean;
	FetchFlighsWithBookingPolicy: boolean;
	Language: string;
}