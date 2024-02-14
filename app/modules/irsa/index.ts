import { Module } from "@core/module";
import { IrsaController } from "./controller";

@Module({
    id: "irsa",
    name: "irsa",
    version: "v0.0.1"
})
export class IrsaModule extends IrsaController {
    constructor() {
        super();
    }
}