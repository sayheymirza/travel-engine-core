import expressJSDocSwagger from "express-jsdoc-swagger";
import path from "path";
// lib
import { App } from "@lib/express";
// json
import packageJson from "../../package.json";

const options = {
	info: {
		version: packageJson.version,
		title: packageJson.name
			.split("-")
			.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
			.join(" "),
		description: packageJson.description,
		license: {
			name: packageJson.license,
		},
		contact: {
			name: packageJson.author.name,
			url: packageJson.author.url,
		},
	},
	security: {
		AuthToken: {
			type: "http",
			scheme: "bearer",
		},
	},
	baseDir: path.join(__dirname, ".."),
	filesPattern: ["./routes/**/*.ts"],
	// URL where SwaggerUI will be rendered
	swaggerUIPath: "/docs/ui",
	// Expose OpenAPI UI
	exposeSwaggerUI: true,
	// Expose Open API JSON Docs documentation in `apiDocsPath` path.
	exposeApiDocs: true,
	// Open API JSON Docs endpoint.
	apiDocsPath: "/docs/api",
};

expressJSDocSwagger(App)(options);
