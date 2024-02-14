import functions from "@core/functions";
import moment from "jalali-moment";
import { v4 as uuid } from "uuid";
import { IFormatSearchInput, IFormatSearchOutput, IFormatSearchOutputOptions, IFormatSearchOutputWay } from "@interface/format";

import helper from "./helper";
import { ICodeName } from "@interface/common";
const fromRequestForSearch = (input: IFormatSearchInput) => {

    const cred = helper.getUsernamePassword()

    return {

        ...cred,

        Origin: input.ways[0].origin.value,
        Destination: input.ways[0].destination.value,
        DepartureDate: functions.formatDateTime(input.ways[0].departure),
        Adult: input.passengers.adult,
        Child: input.passengers.child,
        Infant: input.passengers.infant
    };
}

const toResponseOfSearch = (input: any, option: IFormatSearchOutputOptions): any => {

    try {

        const prices: any[] = input.Pricing;
        const _priceAdult = prices[0]
        const _priceChild = prices[1]
        const _priceInfant = prices[2]


        const priceAdult = {
            tax: _priceAdult.Tax == 0 ? [] : [{
                name: "tax",
                amount: _priceAdult.tax,
                currency: {
                    code: 'IRR',
                    name: 'ریال'
                },

            }],
            total: _priceAdult.Total == 0 ? [] : _priceAdult.Total,
            base: _priceAdult.Fare,
            currency: {
                code: "IRR",
                name: "ریال",
            },
        };
        const priceChild = {
            tax: _priceChild.Tax == 0 ? [] : [{
                name: "tax",
                amount: _priceChild.tax,
                currency: {
                    code: 'IRR',
                    name: 'ریال'
                },

            }],
            total: _priceChild.Total == 0 ? [] : _priceChild.Total,
            base: _priceChild.Fare,
            currency: {
                code: "IRR",
                name: "ریال",
            },
        };
        const priceInfant = {
            tax: _priceInfant.Tax == 0 ? [] : [{
                name: "tax",
                amount: _priceInfant.tax,
                currency: {
                    code: 'IRR',
                    name: 'ریال'
                },

            }],
            total: _priceInfant.Total == 0 ? [] : _priceInfant.Total,
            base: _priceInfant.Fare,
            currency: {
                code: "IRR",
                name: "ریال",
            },
        };

        const refrenceId = uuid();

        let charterState: boolean = input.IsCharter
        let remainings: number[] = []; // an array of remaining seats
        let classes: ICodeName[] = []; // an array of cabin class
        let ways: IFormatSearchOutputWay[] = []

        let flightNumber = ""



        for (let group of input.FlightGroups) {


            for (const segment of group.FlightDetails) {




                flightNumber = segment.Id

                // push segment remaining seats
                remainings.push(Number(segment.Status));
                // push sengment cabin class
                classes.push({
                    code: segment.ClassType ? segment.ClassType.toLowerCase() : "",
                    name: segment.ClassTypeName ? segment.ClassTypeName.toLowerCase() : "economy",
                });

                ways = [{
                    airline: {
                        code: segment.MarketingCarrier.toLowerCase(),
                        name: "",
                        number: segment.flightNumber,
                        image: `${option.custom.airlineImageEndpoint}/${segment.MarketingCarrier.toLowerCase()}`,
                    },
                    class: {
                        code: segment.ClassType ? segment.ClassType.toLowerCase() : "",
                        name: segment.ClassTypeName ? segment.ClassTypeName.toLowerCase() : "economy",
                    },
                    origin: {
                        city: {
                            name: "", // city name
                            code: segment.Origin, // city code
                        },
                        airport: {
                            name: "", // airport name
                            code: segment.Origin, // airport code
                        },
                        time: functions.formatTime(segment.Departure),
                        date: moment(segment.Departure).toString(),
                    },
                    destination: {
                        city: {
                            name: "", // city name
                            code: segment.Destination, // city code
                        },
                        airport: {
                            name: "", // airport name
                            code: segment.Destination, // airport code
                        },
                        time: functions.formatTime(segment.Arrival),
                        date: moment(segment.Arrival).toString(),
                    },
                    time: {
                        dateShort: functions.formatDate(segment.Departure, "fa", "jYYYY/jMM/jDD"),
                        dateLong: functions.formatDate(segment.Departure, "fa", "dddd DD MMMM YYYY"),
                        durationShort: functions.formatDuration(segment.Departure, segment.Arrival, "short"),
                        durationLong: functions.formatDuration(segment.Departure, segment.Arrival, "long"),
                    },
                    remaining: {
                        count: segment.Status == null ? -1 : Number(segment.Status),
                        status: functions.statusOfRemaining(segment.Status),
                    },
                }];
            }
        }

        return {
            ref: {
                module: option.module,
                refrenceId: flightNumber,
                provider: input.System,
                agencyId: null,
                price: {
                    adult: { ...priceAdult, commision: 0 },
                    child: { ...priceChild, commision: 0 },
                    infant: { ...priceInfant, commision: 0 },
                },
                performance: 'fast'
            },
            refrenceId: refrenceId,
            remaining: {
                count: Math.min(...remainings),
                status: functions.statusOfRemaining(Math.min(...remainings)),
            },
            classes: classes,
            sellType: charterState ? "charter" : "system",
            price: {
                adult: priceAdult,
                child: priceChild,
                infant: priceInfant,
            },
            ways: ways,
            status: "reservable",
        };
    }
    catch (error) {

        console.log(error)
    }
}

export default {
    fromRequestForSearch,
    toResponseOfSearch,
}

