import inquirer from "inquirer";
import colors from "colors";
import mustache from "mustache";
import fs from "fs";
import path from "path";

const __dirmodules = path.join(__dirname, "..", "..", "modules");

export default async () => {
	try {
		// ask for module name and version
		const { name, version } = await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "What is your module name ?",
			},
			{
				type: "input",
				name: "version",
				message: "What is your module version ?",
			},
		]);

		const result = createModule(name, version);
		if (result.status == false) {
			// do not re create module if exists
			console.log(colors.red(result.message));
			process.exit(1);
		} else {
			console.log(colors.green(result.message));
			process.exit(0);
		}
	} catch (error) {
		//
	}
};

export const createModule = (name: string, version: string) => {
	// replace " " with "-"
	const _name = name.split(" ").join("-");
	// uppercase first lettter of each word
	const _module = (name.split(" ") as string[]).map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join("");
	// output module name
	const __dirmodule = path.join(__dirmodules, _name);
	// check module exists
	if (fs.existsSync(__dirmodule)) {
		return {
			status: false,
			code: 409,
			message: `Module with name "${name}" exists !`,
		};
	} else {
		// make module folder
		fs.mkdirSync(__dirmodule);
		// read template files
		const files = fs.readdirSync(path.join(__dirname, "files"));
		for (let file of files) {
			// module output file path
			const output = path.join(__dirmodule, file.replace(".mustache", ".ts"));
			// read template file
			const template = fs.readFileSync(path.join(__dirname, "files", file)).toString();
			// render module file with mustache
			fs.writeFileSync(
				output,
				mustache.render(template, {
					id: _name,
					name: name,
					version: `v${version}`,
					module: _module,
				})
			);
		}
		// module index file path
		const __fileindex = path.join(__dirmodules, "index.ts");
		// read module index file
		const index = fs.readFileSync(__fileindex).toString();
		// split lines by \n
		const indexLines = index.split("\n");

		// import module
		indexLines.unshift(`import { ${_module}Module } from "./${_name}";`);

		// add to map module
		indexLines[indexLines.length - 1] = `\t"${_name}": new ${_module}Module(),\n}`;

		fs.writeFileSync(__fileindex, indexLines.join("\n"));

		return {
			status: true,
			code: 200,
			message: "Module created successfully",
		};
	}
};
