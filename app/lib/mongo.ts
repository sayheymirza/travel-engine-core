import mongoose from "mongoose";
import { Logger } from "@lib/logger";

const connect = (url: string) =>
	mongoose
		.connect(url, {
			authSource: "admin",
		})
		.then(() => {
			Logger.log("info", `Mongodb client connected to '${url}'`);
		})
		.catch((error) => {
			Logger.error(`Mongodb client for '${url}' connection failed`);
		});

export default {
	connect,
	ose: mongoose,
};
