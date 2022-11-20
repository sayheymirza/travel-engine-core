import api from "./api";

const getToken = async (): Promise<string | null> => {
	try {
		const result = await api.auth({
			email: "Admin@gmail.com",
			password: "Leoproject123$%&",
		});

		const token = result.data.data.jwToken;
		return token;
	} catch (error) {
		return null;
	}
};

export default {
	getToken,
};
