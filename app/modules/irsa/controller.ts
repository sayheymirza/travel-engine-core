import api from "./api";
// interfaces
import { IFormatSearchInput } from "@interface/format";
// core
import { AbstractModule } from "@core/module/abstract";

export class IrsaController extends AbstractModule {
    public async search(data: IFormatSearchInput, token: string) {
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