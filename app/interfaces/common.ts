export interface IDateTime {
	year: number;
	month: number;
	day: number;
	format: "jalali" | "gregorian";
}

export interface ILocation {
	value: string;
	text: string;
}

export type TRemainingStatus = "unnormal" | "empty" | "low" | "medium" | "high" | "normal";

export interface ITag {
	text: string;
	category: string;
}

export interface IResponse {
	status: boolean;
	code: number;
	error?: number;
	message?: string;
	debug?: any;
	data?: any;
}

export interface ICodeName {
	code: string;
	name: string;
}

export interface ITimestamp {
	start?: number;
	startedAt?: string;
	end?: number;
	endedAt?: string;
	duration?: number;
}
