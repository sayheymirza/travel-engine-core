// lib
import { ICronjob } from "@interface/core/cronjob";
import mongo from "@lib/mongo";
import { Model } from "mongoose";
import { Schema } from "./database";

export interface ICronjobConfig {
	mongo: string;
	interval?: number;
}

export abstract class Cronjob {
	private interval: any;
	private model!: Model<ICronjob>;

	constructor(private config: ICronjobConfig) {
		this.connectToDatabase();
		// this.runCronjob();
		this.fireCronjob();
	}

	private connectToDatabase() {
		mongo.connect(this.config.mongo);
		this.model = mongo.ose.model("cronjob", Schema, "cronjob") as any;
	}

	//
	private runCronjob() {
		this.interval = setInterval(() => {
			this.fireCronjob();
		}, this.interval || 60000);
	}

	//
	private async fireCronjob() {
		try {
			const result = await this.model.find({}).exec();
			result.forEach((item) => this.executeCronjob(item));
		} catch (error) {
			//
		}
	}

	//
	public async SaveCronjob(job: ICronjob) {
		try {
			const data = this.onBeforeSaveCronjob(job);
			return await this.model.updateOne({ key: job.key }, data).exec();
		} catch (error) {
			console.error("Could not save the job");
		}
	}

	//
	public AddToCronjob(job: ICronjob) {
		return new this.model(this.onBeforeSaveCronjob(job)).save();
	}

	//
	public RemoveFromCronjob(key: string) {
		return this.model.remove({ key: key });
	}

	//
	public async GetFromCronjob(key: string): Promise<ICronjob | null | undefined> {
		try {
			const result = await this.model.findOne({ key: key }).exec();
			if (result) {
				this.model.updateOne({ key: key }, { readCount: result.readCount! + 1 }).exec();
			}
			return result;
		} catch (error) {
			return undefined;
		}
	}

	//
	public async IsInCronjob(key: string) {
		return (await this.GetFromCronjob(key)) == undefined;
	}

	//
	public GenerateKey(data: any) {
		return JSON.stringify(data);
	}

	//
	abstract executeCronjob(job: ICronjob): Promise<void>;

	//
	abstract onBeforeSaveCronjob(data: ICronjob): ICronjob;
}
