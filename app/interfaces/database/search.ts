import { ITimestamp } from "@interface/common";
import { IModuleDefination } from "@interface/core/module";
import { IFormatSearchInput, IFormatSearchOutput } from "@interface/format";

export interface IDBSearch {
	count: number; // count of output
	status: "fetch" | "done";
	expire: ITimestamp;
	timestamp: ITimestamp;
	modules: IDBSearchModule[];
	input: IFormatSearchInput;
	output: IFormatSearchOutput[];
}

export interface IDBSearchModule {
	status: "fetch" | "success" | "faild";
	defination: IModuleDefination;
	timestamp?: ITimestamp;
}

export interface IDBSearchForce {
	start: number;
	modules: IModuleDefination[];
	input: IFormatSearchInput;
	output: IFormatSearchOutput[];
}
