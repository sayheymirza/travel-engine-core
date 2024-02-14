import { ICodeName, IDateTime, ILocation, TRemainingStatus } from "./common";
import { IModuleDefination } from "./core/module";

// Format search input
export interface IFormatSearchInput {
	passengers: IFormatSearchInputPassengers;
	trip: TFormatSearchInputTripType;
	ways: IFormatSearchInputWay[];
}

export type TFormatSearchInputTripType = "go" | "go-back";

export enum EFormatSearchInputTripType {
	"go" = 1,
	"go-back" = 2,
}

export interface IFormatSearchInputPassengers {
	adult: number;
	child: number;
	infant: number;
}

export interface IFormatSearchInputWay {
	departure: IDateTime;
	origin: ILocation;
	destination: ILocation;
}

// Format search output
export interface IFormatSearchOutputWay {
	airline: {
		code: string;
		name: string;
		number: string;
		image: string;
	};
	class: ICodeName;
	origin: {
		city: ICodeName;
		airport: ICodeName;
		time: string;
		date: string;
	};
	destination: {
		city: ICodeName;
		airport: ICodeName;
		time: string;
		date: string;
	};
	time: {
		dateShort: string;
		dateLong: string;
		durationShort: string; // 01:02
		durationLong: string; // 1 hour and 2 minute
	};
	remaining: {
		count: number;
		status: TRemainingStatus;
	};
}

export interface IFormatSearchOutputRefPriceItem extends IFormatSearchOutputPriceItem {
	commision: number;
}

export interface IFormatSearchOutputRefPrice {
	adult: IFormatSearchOutputRefPriceItem;
	child: IFormatSearchOutputRefPriceItem;
	infant: IFormatSearchOutputRefPriceItem;
}

export interface IFormatSearchOutputRef {
	module: string; // module id
	provider: number;
	refrenceId: string; // module refrence id
	agencyId: string | null;
	price: IFormatSearchOutputRefPrice;
	performance: "realtime" | "fast" | "lazy" | "unknown";
}

export interface IFormatSearchOutputPriceItemTax {
	name: string;
	amount: number;
	currency: ICodeName;
}

export interface IFormatSearchOutputPriceItem {
	tax: IFormatSearchOutputPriceItemTax[];
	total: number;
	base: number;
	currency: ICodeName;
}

export interface IFormatSearchOutputPrice {
	adult: IFormatSearchOutputPriceItem;
	child: IFormatSearchOutputPriceItem;
	infant: IFormatSearchOutputPriceItem;
}

export interface IFormatSearchOutput {
	refrenceId: string; // travel engine refrence id
	remaining: {
		count: number;
		status: TRemainingStatus;
	};
	ref: IFormatSearchOutputRef;
	price: IFormatSearchOutputPrice;
	ways: IFormatSearchOutputWay[][]; // ways with multi legs
	classes: ICodeName[];
	sellType: "system" | "charter";
	status: "reservable" | "unreservable" | "disabled";
}

export interface IFormatSearchOutputCustomize {
	airlineImageEndpoint: string;
	suffix?: string;
}

export interface IFormatSearchOutputOptions {
	custom: IFormatSearchOutputCustomize;
	module: string;
	agency?: string | number;
	performance?: "realtime" | "fast" | "lazy" | "unknown";
}
