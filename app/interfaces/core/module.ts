import { IResponse } from "@interface/common";
import { IFormatSearchInput } from "@interface/format";

export interface IModuleDefination {
	id: string;
	name: string;
	version: string;
}

export interface IModuleSearchParam {
	data: IFormatSearchInput;
	modules: string[];
}

export interface IModuleRevalidateParam {
	searchToken: string;
	refrenceId: string;
}
