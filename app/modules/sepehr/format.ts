import functions from "@core/functions";
import { IFormatSearchInput, IFormatSearchOutput, IFormatSearchOutputOptions } from "@interface/format";
import { ISepehrSearchInput } from "./interface";
import { v4 as uuid } from "uuid";
import moment from "jalali-moment";

const fromRequestForSearch = (input: IFormatSearchInput): ISepehrSearchInput => {
	return {
		OriginIataCode: input.ways[0].origin.value,
		DestinationIataCode: input.ways[0].destination.value,
		DepartureDate: functions.formatDateTime(input.ways[0].departure),
		ReturningDate: null,
		FetchSupplierWebserviceFlights: false,
		FetchFlighsWithBookingPolicy: true,
		Language: "FA",
	};
};

const toResponseOfSearchClass = (input: any, klass: any, option: IFormatSearchOutputOptions): IFormatSearchOutput => {
	const refrenceId = uuid();

	const priceAdult: any = {
		tax: klass.AdultFare.Tax == 0 ? [] : [],
		total: klass.AdultFare.TotalFare,
		base: klass.AdultFare.BaseFare,
		currency: {
			code: "",
			name: "",
		},
	};
	const priceChild: any = {
		tax: klass.ChildFare.Tax == 0 ? [] : [],
		total: klass.ChildFare.TotalFare,
		base: klass.ChildFare.BaseFare,
		currency: {
			code: "",
			name: "",
		},
	};
	const priceInfant: any = {
		tax: klass.InfantFare.Tax == 0 ? [] : [],
		total: klass.InfantFare.TotalFare,
		base: klass.InfantFare.BaseFare,
		currency: {
			code: "",
			name: "",
		},
	};

	return {
		ref: {
			module: option.module,
			refrenceId: `${input.FlightNumber}_${klass.FareName}`,
			provider: input.provider,
			agencyId: option.agancy?.toString() ?? null,
			price: {
				adult: { ...priceAdult, commision: 0 },
				child: { ...priceChild, commision: 0 },
				infant: { ...priceInfant, commision: 0 },
			},
		},
		refrenceId: refrenceId,
		remaining: {
			count: klass.AvailableSeat,
			status: functions.statusOfRemaining(klass.AvailableSeat),
		},
		classes: [
			{
				code: klass.BookingCode,
				name: klass.CabinType,
			},
		],
		sellType: "charter",
		price: {
			adult: priceAdult,
			child: priceChild,
			infant: priceInfant,
		},
		ways: [
			[
				{
					airline: {
						code: input.Airline.toLowerCase(),
						name: "",
						number: input.FlightNumber,
						image: `${option.custom.airlineImageEndpoint}/${input.Airline.toLowerCase()}`,
					},
					origin: {
						city: {
							name: "", // city name
							code: input.Origin.Code.toLowerCase(), // city code
						},
						airport: {
							name: "", // airport name
							code: input.Origin.Code.toLowerCase(), // airport code
						},
						time: functions.formatTime(input.DepartureDateTime),
						date: moment(input.DepartureDateTime).toString(),
					},
					destination: {
						city: {
							name: "", // city name
							code: input.Destination.Code.toLowerCase(), // city code
						},
						airport: {
							name: "", // airport name
							code: input.Destination.Code.toLowerCase(), // airport code
						},
						time: functions.formatTime(input.ArrivalDateTime),
						date: moment(input.ArrivalDateTime).toString(),
					},
					class: {
						code: klass.BookingCode,
						name: klass.CabinType,
					},
					time: {
						dateShort: functions.formatDate(input.DepartureDateTime, "fa", "jYYYY/jMM/jDD"),
						dateLong: functions.formatDate(input.DepartureDateTime, "fa", "dddd DD MMMM YYYY"),
						durationShort: functions.formatDuration(input.DepartureDateTime, input.ArrivalDateTime, "short"),
						durationLong: functions.formatDuration(input.DepartureDateTime, input.ArrivalDateTime, "long"),
					},
					remaining: {
						count: klass.AvailableSeat,
						status: functions.statusOfRemaining(klass.AvailableSeat),
					},
				},
			],
		],
		status: "reservable",
	};
};

const toResponseOfSearch = (input: any, option: IFormatSearchOutputOptions): IFormatSearchOutput[] => {
	return input.Classes.map((klass: any) => toResponseOfSearchClass(input, klass, option));
};

export default {
	fromRequestForSearch,
	toResponseOfSearch,
};
