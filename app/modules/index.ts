import { IrsaModule } from "./irsa";
import { FaranegarModule } from "./faranegar";
import { SepehrModule } from "./sepehr";
import { LeopardModule } from "./leopard";

export default {
	leopard: new LeopardModule(),
	sepehr: new SepehrModule(),
	faranegar: new FaranegarModule(),
	"irsa": new IrsaModule(),
}