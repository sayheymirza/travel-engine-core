declare namespace Express {
	interface Request {
		user: string;
		timestamp: number;
	}
	interface Response {
		_json: any;
		_body: any;
	}
}
