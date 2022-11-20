import inquirer from "inquirer";
import createModule from "./create-module";
import deleteModule from "./delete-module";

(async () => {
	try {
		const { action } = await inquirer.prompt([
			{
				type: "list",
				name: "action",
				message: "What do you want to do ?",
				choices: [
					{
						value: "create-module",
						name: "Create a module",
					},
					{
						value: "delete-module",
						name: "Delete a module",
					},
				],
			},
		]);

		switch (action) {
			case "create-module":
				createModule();
				break;
			
			case "delete-module":
				deleteModule()
				break;

			default:
				break;
		}
	} catch (error) {
		//
	}
})();
