export interface ICronjob {
	key: string;
	config: object;
	input: object;
	output?: object;
	endAt?: Date;
	executeCount?: number;
	readCount?: number;
	errorCount?: number;
	executedAt?: Date;
	executeTimer?: number;
}
