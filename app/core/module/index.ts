import { IModuleDefination } from "@interface/core/module";
import Modules from "@modules/index";
import { AbstractModule } from "./abstract";

/**
 * Some information about the module
 * @param defination module name and version
 */
export const Module = (defination: IModuleDefination) => {
	return (target: any) => {
		target.prototype.defination = defination;
	};
};

/**
 * Get modules by ids
 * @param keys installed modules id
 * @returns a list of modules
 */
export const useModules = (keys: string[] = []): AbstractModule[] => {
	// retrun all modules if no keys provided
	return keys.length == 0 ? (Object.values(Modules) as AbstractModule[]) : keys.map((key: string) => (Modules as any)[key]);
};

export const getModuleByKey = (key: keyof typeof Modules) => Modules[key];

export default {
	getByKey: getModuleByKey,
};
