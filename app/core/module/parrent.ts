import { IModuleRevalidateParam, IModuleSearchParam } from "@interface/core/module";
import { getModuleByKey, useModules } from ".";
import searchDB from "@database/search";
import { IResponse } from "@interface/common";

const search = async (param: IModuleSearchParam): Promise<IResponse> => {
	try {
		const modules = useModules(param.modules as any);

		const start = Date.now();

		const output = await Promise.all(modules.map((module) => module.search(param.data, undefined)));

		const result = await searchDB.setForce({
			start,
			modules: modules.map((item) => item.defination!),
			input: param.data,
			output: output.flatMap((item) => item.data),
		});

		return {
			status: true,
			code: 200,
			message: "All search results are in here",
			data: result,
		};
	} catch (error) {
		console.error(error)
		return {
			status: false,
			code: 500,
			error: 2,
			message: "Unhandled server error",
		};
	}
};

const searchLazy = async (param: IModuleSearchParam): Promise<any | undefined> => {
	try {
		const modules = useModules(param.modules as any);

		const result = await searchDB.set(
			modules.map((item) => item.defination!),
			param.data
		);

		modules.map((module) => module.search(param.data, result.token));

		return result;
	} catch (error) {
		return undefined;
	}
};

const revalidate = async (param: IModuleRevalidateParam): Promise<any> => {
	try {
		const data = await searchDB.get(param.searchToken);

		if (data == null) {
			return {};
		}

		const item = data.output.find((item) => item.refrenceId == param.refrenceId);
		if (item == undefined) {
			return {};
		}

		const { module, refrenceId } = item.ref;

		const result = await getModuleByKey(module as any).revalidate(refrenceId);

		return {
			data: result.data,
		};
	} catch (error) {
		return {
			data: {},
		};
	}
};

export default {
	search,
	searchLazy,
	revalidate,
};
