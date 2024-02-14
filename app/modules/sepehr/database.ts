import { Schema, model } from "mongoose";

const agencySchema = new Schema({
	code: { type: String, required: true },
	name: { type: String, required: true },
	endpoint: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	active: { type: Boolean, default: false },
	public: { type: Boolean, default: true },
});

export const agencyModel = model("agency", agencySchema);

export default {
	agency: agencyModel,
};
