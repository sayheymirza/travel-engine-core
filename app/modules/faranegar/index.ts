import { Module } from "@core/module";
import { FaranegarController } from "./controller";

@Module({
    id: "faranegar",
    name: "faranegar",
    version: "v0.0.1"
})
export class FaranegarModule extends FaranegarController {
    constructor() {
        super();
    }
}