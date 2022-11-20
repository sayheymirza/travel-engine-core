import { Module } from "@core/module";
import { SepehrController } from "./controller";

@Module({
    id: "sepehr",
    name: "sepehr",
    version: "v0.0.1"
})
export class SepehrModule extends SepehrController {
    constructor() {
        super();
    }
}