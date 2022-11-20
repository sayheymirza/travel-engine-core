// lib
import Redis from "@lib/redis";
// interface
import { IDBAuthUser } from "@interface/database/auth";
// auth config from env
let { AUTH_TOKEN_EXPIRE } = process.env;

if (!AUTH_TOKEN_EXPIRE) {
	AUTH_TOKEN_EXPIRE = "3600";
}

const setToken = (token: string, username: string) => Redis.setEx(`#/travel-engine-core/auth/token/${token}`, Number(AUTH_TOKEN_EXPIRE), username);

const getToken = (token: string) => Redis.get(`#/travel-engine-core/auth/token/${token}`);

const setUser = (user: IDBAuthUser) => Redis.set(`#/travel-engine-core/auth/user/${user.username}`, JSON.stringify(user));

const getUser = async (username: string): Promise<IDBAuthUser | null> => {
	try {
		const user = await Redis.get(`#/travel-engine-core/auth/user/${username}`);
		if (user) return JSON.parse(user);
		else return null;
	} catch (error) {
		return null;
	}
};

const deleteUser = (username: string) => Redis.del(`#/travel-engine-core/auth/user/${username}`);

export default {
	setToken,
	getToken,
	setUser,
	getUser,
	deleteUser,
	expire: Number(AUTH_TOKEN_EXPIRE),
};
