import { Module } from "@core/module";
import { LeopardController } from "./controller";

@Module({
	id: "leopard",
	name: "leopard",
	version: "v0.0.1",
})
export class LeopardModule extends LeopardController {}
