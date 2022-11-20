export interface IAPIRequestOptions {
    
}

export interface ISepehrSearchInput {
    "OriginIataCode": string,
    "DestinationIataCode": string,
    "DepartureDate": string,
    "ReturningDate": string | null,
    "FetchSupplierWebserviceFlights": boolean,
    "FetchFlighsWithBookingPolicy": boolean,
    "Language": string
}