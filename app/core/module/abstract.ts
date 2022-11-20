import { IResponse } from "@interface/common";
import { IModuleDefination } from "@interface/core/module";
import { IFormatSearchInput } from "@interface/format";

export abstract class AbstractModule {
	public readonly defination?: IModuleDefination;

	abstract search(data: IFormatSearchInput): Promise<IResponse>;
	abstract revalidate(refrenceId: string): Promise<IResponse>;
	abstract refund(): Promise<IResponse>;
	abstract reserve(): Promise<IResponse>;
	abstract issue(): Promise<IResponse>;
	abstract details(): Promise<IResponse>;
	abstract ticket(): Promise<IResponse>;
}
