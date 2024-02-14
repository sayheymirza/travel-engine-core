import { Cronjob } from "@core/cronjob/index";
import { ICronjob } from "@interface/core/cronjob";
import moment from "jalali-moment";
import helper from "./helper";
import { ISepehrSearchInput } from "./interface";
// get cronjob sepehr config from env
const { MONGO_SEPEHR } = process.env;

class SepehrCornjob extends Cronjob {
	constructor() {
		super({
			mongo: MONGO_SEPEHR as string,
			interval: 5000,
		});
	}

	async executeCronjob(job: ICronjob) {
		try {
			const result = await helper.requestSearch({ input: job.input as any, organization: (job.config as any).organization, agency: (job.config as any).agency }, true);
			// inc error count
			if (result.status == false) {
				job.errorCount = job.errorCount! + 1;
			}
			job.executeCount = job.executeCount! + 1;
			job.output = result.data;
			await this.SaveCronjob(job);
		} catch (error: any) {
			console.error(error);
		}
	}

	onBeforeSaveCronjob(data: ICronjob): ICronjob {
		const input = data.input as ISepehrSearchInput;
		const timer = 3000;
		const executedAt = new Date();
		executedAt.setSeconds(executedAt.getSeconds() + timer);
		const endAt = data.endAt ?? moment().set("hour", 24).set("minute", 0).set("second", 0).toISOString();

		return {
			key: data.key,
			config: data.config,
			input: data.input,
			output: data.output,
			endAt: endAt as any,
			errorCount: data.errorCount ?? 0,
			executeCount: data.executeCount ?? 0,
			executedAt,
			executeTimer: timer,
		};
	}
}

export default new SepehrCornjob();
