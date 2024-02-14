import { AbstractModule } from "@core/module/abstract";
import { IFormatSearchInput } from "@interface/format";
import api from "./api";
import format from "./format";


export class FaranegarController extends AbstractModule {
    public async search(data: IFormatSearchInput, token: string | undefined) {
        try {


            const res = await api.search(format.fromRequestForSearch(data), {
                module: this.defination!,
            });




            console.log(res.status)

            if (res.status == true) {

                console.log(res.data)

                const data = res.data.FlightProposals.map((item: any) =>
                    format.toResponseOfSearch(item, {
                        module: this.defination!.id,
                        custom: {
                            airlineImageEndpoint: "https://flight.logo.travel-engine.ir",
                            suffix: res.data.Reference,
                        },
                    })
                );

                console.log(data)

                return {
                    status: true,
                    code: 200,
                    module: this.defination,
                    data: data,
                };

            }

        } catch (error) {
            return {
                status: false,
                code: 500,
                error: 0,
                message: "Unhandled server error",
                debug: error
            }
        }

        return {
            status: false,
            code: 500,
            data: [],
        };
    }

    public async revalidate() {
        try {
            return {
                status: true,
                code: 200,
                module: this.defination,
                data: [],
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: 0,
                message: "Unhandled server error",
                debug: error
            }
        }
    }

    public async refund() {
        try {
            return {
                status: true,
                code: 200,
                module: this.defination,
                data: [],
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: 0,
                message: "Unhandled server error",
                debug: error
            }
        }
    }

    public async reserve() {
        try {
            return {
                status: true,
                code: 200,
                module: this.defination,
                data: [],
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: 0,
                message: "Unhandled server error",
                debug: error
            }
        }
    }

    public async issue() {
        try {
            return {
                status: true,
                code: 200,
                module: this.defination,
                data: [],
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: 0,
                message: "Unhandled server error",
                debug: error
            }
        }
    }

    public async details() {
        try {
            return {
                status: true,
                code: 200,
                module: this.defination,
                data: [],
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: 0,
                message: "Unhandled server error",
                debug: error
            }
        }
    }

    public async ticket() {
        try {
            return {
                status: true,
                code: 200,
                module: this.defination,
                data: [],
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: 0,
                message: "Unhandled server error",
                debug: error
            }
        }
    }
}