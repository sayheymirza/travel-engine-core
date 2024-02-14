import functions from "@core/functions";
import { IFormatSearchInput, IFormatSearchOutput, IFormatSearchOutputOptions } from "@interface/format";
import { IIrsaSearchInput } from "./interface";

const fromRequestForSearch = (input: IFormatSearchInput): IIrsaSearchInput => {
    return  {
		fromAirport: input.ways[0].origin.value,
        allinFromCity:false,
		toAirport: input.ways[0].destination.value,
        allinToCity:false,
		fromDate: functions.formatDateTime(input.ways[0].departure),
		returnDate: undefined,
		adult:input.passengers.adult,
        child:input.passengers.child,
        infant:input.passengers.infant,
        TestMode:false,
	};
}

const toResponseOfSearch = (input: any, option: IFormatSearchOutputOptions): any => {
    return {
        // 
    }
}

export default {
    fromRequestForSearch,
    toResponseOfSearch,
}