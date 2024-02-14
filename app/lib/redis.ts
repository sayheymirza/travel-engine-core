// import packages
import Redis from "ioredis";
import { Logger } from "@lib/logger";

// get redis server config from env
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

// create redis client
const client = new Redis({
	host: REDIS_HOST,
	port: Number(REDIS_PORT),
	password: REDIS_PASSWORD,
	lazyConnect: true
});

client
	.connect()
	.then(() => {
		Logger.log("info", "Redis client connected");
	})
	.catch((error) => {
		console.error(error);
		Logger.error("Redis client connection failed");
	});

export default client;
