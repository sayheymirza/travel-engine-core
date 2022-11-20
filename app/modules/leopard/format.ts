import moment from "jalali-moment";
import { v4 as uuid } from "uuid";
// core
import functions from "@core/functions";
import { ICodeName } from "@interface/common";
// interfaces
import { IFormatSearchInput, EFormatSearchInputTripType, IFormatSearchOutput, IFormatSearchOutputWay, IFormatSearchOutputCustomize, IFormatSearchOutputOptions } from "@interface/format";
import { ILeopardSearchInput } from "./interface";

const fromRequestForSearch = (input: IFormatSearchInput): ILeopardSearchInput => {
	return {
		flightSteps: input.ways.map((item) => ({
			departureDate: functions.formatDateTime(item.departure),
			originCode: item.origin.value,
			destinationCode: item.destination.value,
		})),
		searchedPassenger: {
			adt: input.passengers.adult,
			chd: input.passengers.child,
			inf: input.passengers.infant,
		},
		flightPreferences: {
			cabinClass: 1,
			tripType: EFormatSearchInputTripType[input.trip],
		},
	};
};

const toResponseOfSearch = (input: any, option: IFormatSearchOutputOptions): IFormatSearchOutput => {
	const prices: any[] = input.airItineraryPricingInfo.ptcFareBreakdown;
	const _priceAdult = prices.find((item) => item.passengerTypeQuantity.passengerType == 1)?.passengerFare ?? {};
	const _priceChild = prices.find((item) => item.passengerTypeQuantity.passengerType == 2)?.passengerFare ?? {};
	const _priceInfant = prices.find((item) => item.passengerTypeQuantity.passengerType == 3)?.passengerFare ?? {};

	const priceAdult = {
		tax: _priceAdult.taxes
			.filter((item: any) => item.amount != 0)
			.map((item: any) => ({
				name: item.name ?? "",
				amount: item.amount,
				currency: {
					code: item.currency,
					name: "",
				},
			})),
		total: _priceAdult.totalFare,
		base: _priceAdult.baseFare,
		currency: {
			code: _priceAdult.currency,
			name: "",
		},
	};
	const priceChild = {
		tax: (_priceChild.taxes ?? [])
			.filter((item: any) => item.amount != 0)
			.map((item: any) => ({
				name: item.name ?? "",
				amount: item.amount,
				currency: {
					code: item.currency,
					name: "",
				},
			})),
		total: _priceChild.totalFare,
		base: _priceChild.baseFare,
		currency: {
			code: _priceChild.currency,
			name: "",
		},
	};
	const priceInfant = {
		tax: (_priceInfant.taxes ?? [])
			.filter((item: any) => item.amount != 0)
			.map((item: any) => ({
				name: item.name ?? "",
				amount: item.amount,
				currency: {
					code: item.currency,
					name: "",
				},
			})),
		total: _priceInfant.totalFare,
		base: _priceInfant.baseFare,
		currency: {
			code: _priceInfant.currency,
			name: "",
		},
	};

	const refrenceId = uuid();

	let charterState: boolean = false; // check isCharter in all segments
	let remainings: number[] = []; // an array of remaining seats
	let classes: ICodeName[] = []; // an array of cabin class
	let ways: IFormatSearchOutputWay[][] = [];

	for (let options of input.originDestinationOptions) {
		ways.push([]);
		const index = ways.length - 1;

		for (let segment of options.flightSegments) {
			// push segment remaining seats
			remainings.push(segment.seatsRemaining);
			// change state charter
			if (charterState == false) charterState = segment.isCharter;
			// push sengment cabin class
			classes.push({
				code: segment.cabinClassCode ? segment.cabinClassCode.toLowerCase() : "",
				name: segment.cabinClassCodeName ? segment.cabinClassCodeName.toLowerCase() : "economy",
			});

			ways[index].push({
				airline: {
					code: segment.marketingAirlineCode.toLowerCase(),
					name: "",
					number: segment.flightNumber,
					image: `${option.custom.airlineImageEndpoint}/${segment.marketingAirlineCode.toLowerCase()}`,
				},
				class: {
					code: segment.cabinClassCode ? segment.cabinClassCode.toLowerCase() : "",
					name: segment.cabinClassCodeName ? segment.cabinClassCodeName.toLowerCase() : "economy",
				},
				origin: {
					city: {
						name: "", // city name
						code: segment.departureAirportLocationCode, // city code
					},
					airport: {
						name: "", // airport name
						code: "", // airport code
					},
					time: functions.formatTime(segment.departureDateTime),
					date: moment(segment.departureDateTime).toString(),
				},
				destination: {
					city: {
						name: "", // city name
						code: segment.arrivalAirportLocationCode, // city code
					},
					airport: {
						name: "", // airport name
						code: "", // airport code
					},
					time: functions.formatTime(segment.arrivalDateTime),
					date: moment(segment.arrivalDateTime).toString(),
				},
				time: {
					dateShort: functions.formatDate(segment.departureDateTime, "fa", "jYYYY/jMM/jDD"),
					dateLong: functions.formatDate(segment.departureDateTime, "fa", "dddd DD MMMM YYYY"),
					durationShort: functions.formatDuration(segment.departureDateTime, segment.arrivalDateTime, "short"),
					durationLong: functions.formatDuration(segment.departureDateTime, segment.arrivalDateTime, "long"),
				},
				remaining: {
					count: segment.seatsRemaining == null ? -1 : Number(segment.seatsRemaining),
					status: functions.statusOfRemaining(segment.seatsRemaining),
				},
			});
		}
	}

	return {
		ref: {
			module: option.module,
			refrenceId: input.leoRefrenceID + (option.custom.suffix ? `#${option.custom.suffix}` : ""),
			provider: input.provider,
			agencyId: null,
			price: {
				adult: { ...priceAdult, commision: 0 },
				child: { ...priceChild, commision: 0 },
				infant: { ...priceInfant, commision: 0 },
			},
		},
		refrenceId: refrenceId,
		remaining: {
			count: Math.min(...remainings),
			status: functions.statusOfRemaining(Math.min(...remainings)),
		},
		classes: classes,
		sellType: charterState ? "charter" : "system",
		price: {
			adult: priceAdult,
			child: priceChild,
			infant: priceInfant,
		},
		ways: ways,
		status: "reservable",
	};
};

export default {
	fromRequestForSearch,
	toResponseOfSearch,
};
