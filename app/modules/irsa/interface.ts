export interface IAPIRequestOptions {

}


export interface IIrsaSearchInput {
    fromAirport: string,
    allinFromCity: boolean,
    toAirport: string,
    allinToCity: boolean,
    fromDate: string,
    returnDate?: string,
    adult: number,
    child: number,
    infant: number,
    TestMode: boolean,
    classType?:string
}

