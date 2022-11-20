// import packages
import cors from "cors";
import morgan from "morgan";
import express from "express";
// lib
import { App } from "@lib/express";
import { Logger } from "@lib/logger";
// routes
import Routes from "@routes/index";
// core
import { MiddlewareLogRequestEnd, MiddlewareLogRequestStart } from "@core/middleware";
// add cors middleware
App.use(cors());
// add express json middleware
App.use(express.json());
// add express form middleware
App.use(
	express.urlencoded({
		extended: true,
	})
);
// add morgon http logger middleware
App.use(
	morgan("tiny", {
		stream: {
			write: (message: string) => {
				Logger.log("info", message.replace("\n", ""));
			},
		},
	})
);
// use routes
App.use("/api/v1", MiddlewareLogRequestStart, Routes, MiddlewareLogRequestEnd);
// ROOT PATH
App.get("/", (req, res) => {
	res.json({
		status: true,
		code: 200,
		message: "Welcome to Travel Engine core",
	});
});
// send error 404 for all other routes
App.all("*", (req, res) => {
	res.status(404).json({
		status: false,
		code: 404,
		message: "Route not found",
	});
});
// PORT from env.PORT else on port 3200
const PORT = process.env.PORT || 3200;
// start the server
App.listen(PORT, () => {
	Logger.log("info", `Server started on port ${PORT}`);
});
