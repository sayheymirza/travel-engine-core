import assert from "assert";
import { getModuleByKey, useModules } from ".";

describe("should 'module' be ok", () => {
	it("should 'useModule' be ok", () => {
		var modules = useModules(["leopard"]);
		assert.equal(modules.length, 1);
		var modules = useModules([]);
		assert.equal(modules.length, 1);
	});

	it("should 'getModuleByKey' be ok", () => {
		var module = getModuleByKey("leopard");

        assert.notEqual(module, undefined)
	});
});
