import inquirer from "inquirer";
import colors from "colors";
import fs from "fs";
import path from "path";

const __dirmodules = path.join(__dirname, "..", "..", "modules");

export default async () => {
	const { name, confirm } = await inquirer.prompt([
		{
			type: "list",
			name: "name",
			message: "What is your module name ?",
			choices: fs.readdirSync(__dirmodules).filter((item) => item != "index.ts"),
		},
		{
			type: "confirm",
			name: "confirm",
			message: "Are you sure ?",
		},
	]);

	// if developer was not sure
	if (confirm != true) return;

	const result = deleteModule(name);
	if (result.status == false) {
		// do not need to delete module if not exists
		console.log(colors.red(result.message));
		process.exit(1);
	} else {
		console.log(colors.green(result.message));
		process.exit(0);
	}
};

export const deleteModule = (name: string) => {
	// replace " " with "-"
	const _name = name.split(" ").join("-");
	// uppercase first lettter of each word
	const _module = (name.split(" ") as string[]).map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join("");
	// output module name
	const __dirmodule = path.join(__dirmodules, _name);

	// check module exists
	if (fs.existsSync(__dirmodule) == false) {
		return {
			status: false,
			code: 404,
			message: `Module with name "${name}" not exists!`,
		};
	} else {
		// module index file path
		const __fileindex = path.join(__dirmodules, "index.ts");
		// read module index file

		const index = fs.readFileSync(__fileindex).toString();
		// split lines by \n
		const indexLines = index.split("\n");
		// find import line
		const importIndex = indexLines.findIndex((item) => item.startsWith(`import { ${_module}Module }`));
		// remove import line if exists
		if (importIndex != -1) {
			indexLines.splice(importIndex, 1);
		}
		// find map module line
		const mapIndex = indexLines.findIndex((item) => item.includes(`new ${_module}Module`));
		// remove map module if exists
		if (mapIndex != -1) {
			indexLines.splice(mapIndex, 1);
		}

		fs.writeFileSync(__fileindex, indexLines.join("\n"));

		fs.rmSync(__dirmodule, { force: true, recursive: true });

		return {
			status: true,
			code: 200,
			message: "Module deleted successfully",
		};
	}
};
