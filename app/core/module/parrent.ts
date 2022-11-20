import { IModuleRevalidateParam, IModuleSearchParam, IModuleSearchResult } from "@interface/core/module";
import { getModuleByKey, useModules } from ".";
import searchDB from "@database/search";
import { IDBSearch } from "@interface/database/search";

const search = async (param: IModuleSearchParam): Promise<IModuleSearchResult> => {
	try {
		const modules = useModules(param.modules as any);
		const result = await Promise.all(modules.map((module) => module.search(param.data)));		
		const output = result.flatMap((item) => item.data).filter((item) => item != null);
		// @TODO format layer 2 needed
		return {
			searchToken: searchDB.set(param.data, output),
			data: output,
		};
	} catch (error) {
		return {
			searchToken: undefined,
			data: [],
		};
	}
};

const revalidate = async (param: IModuleRevalidateParam): Promise<any> => {
	try {
		const savedResult = await searchDB.get(param.searchToken);

		if (savedResult == null) {
			return {};
		}
		const data: IDBSearch = JSON.parse(savedResult);

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
	revalidate,
};
