import { Schema as MongoSchema } from "mongoose";

export const Schema = new MongoSchema(
	{
		key: { type: String, required: true, unique: true },
		config: { type: Object, default: {} },
		input: { type: Object, required: true },
		output: { type: Object, default: null },
		endAt: { type: Date, required: true }, // when need to remove from database
		executeCount: { type: Number, default: 0 },
		readCount: { type: Number, default: 0 },
		errorCount: { type: Number, default: 0 },
		executedAt: { type: Date, required: true }, // when execute
		executeTimer: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);
