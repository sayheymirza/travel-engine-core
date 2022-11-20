// lib
import Redis from "@lib/redis";

const getCity = async (key: string, lang: string = "fa") => await Redis.get(`#/location/city/${key}/${lang}`);

const getCountry = async (key: string, lang: string = "fa") => await Redis.get(`#/location/country/${key}/${lang}`);

const getAirline = async (key: string, lang: string = "fa") => await Redis.get(`#/location/airline/${key}/${lang}`);

const getAirport = async (key: string, lang: string = "fa") => await Redis.get(`#/location/airport/${key}/${lang}`);

export default {
	getCity,
	getCountry,
	getAirline,
	getAirport,
};
