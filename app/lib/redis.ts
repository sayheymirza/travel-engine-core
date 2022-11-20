// import packages
import { createClient } from "redis";
import { Logger } from "@lib/logger";

// get redis server config from env
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

// create redis client
const client = createClient({
	url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
	password: REDIS_PASSWORD,
});

client
	.connect()
	.then(() => {
		Logger.log('info', "Redis client connected");
	})
	.catch(() => {
		Logger.error("Redis client connection failed");
	});

export default client;
