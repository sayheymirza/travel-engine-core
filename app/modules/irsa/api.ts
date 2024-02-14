// lib
import http from "@lib/http";
// interfaces
import { IAPIRequestOptions } from "./interface";

const endpoint = "https://0.0.0.0";

const auth = async (data: any)=> {
    try {
        //
        const result = await http.request({
            method: '',
            path: '',
            endpoint: endpoint,
            data: data,
        })
        //
        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 1,
            message: "Api request faild",
            debug: error
        }
    }
}

const search = async (data: any, options: IAPIRequestOptions)=> {
    try {
        //
        const result = await http.request({
            method: '',
            path: '',
            endpoint: endpoint,
            data: data,
            headers: {
                "": "", // authendication
            }
        })
        //
        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 1,
            message: "Api request faild",
            debug: error
        }
    }
}

const revalidate = async (data: any, options: IAPIRequestOptions)=> {
    try {
        //
        const result = await http.request({
            method: '',
            path: '',
            endpoint: endpoint,
            data: data,
            headers: {
                "": "", // authendication
            }
        })
        //
        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 1,
            message: "Api request faild",
            debug: error
        }
    }
}

const refund = async (data: any, options: IAPIRequestOptions)=> {
    try {
        //
        const result = await http.request({
            method: '',
            path: '',
            endpoint: endpoint,
            data: data,
            headers: {
                "": "", // authendication
            }
        })
        //
        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 1,
            message: "Api request faild",
            debug: error
        }
    }
}

const reserve = async (data: any, options: IAPIRequestOptions)=> {
    try {
        //
        const result = await http.request({
            method: '',
            path: '',
            endpoint: endpoint,
            data: data,
            headers: {
                "": "", // authendication
            }
        })
        //
        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 1,
            message: "Api request faild",
            debug: error
        }
    }
}

const issue = async (data: any, options: IAPIRequestOptions)=> {
    try {
        //
        const result = await http.request({
            method: '',
            path: '',
            endpoint: endpoint,
            data: data,
            headers: {
                "": "", // authendication
            }
        })
        //
        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 1,
            message: "Api request faild",
            debug: error
        }
    }
}

const details = async (data: any, options: IAPIRequestOptions)=> {
    try {
        //
        const result = await http.request({
            method: '',
            path: '',
            endpoint: endpoint,
            data: data,
            headers: {
                "": "", // authendication
            }
        })
        //
        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 1,
            message: "Api request faild",
            debug: error
        }
    }
}

const ticket = async (data: any, options: IAPIRequestOptions)=> {
    try {
        //
        const result = await http.request({
            method: '',
            path: '',
            endpoint: endpoint,
            data: data,
            headers: {
                "": "", // authendication
            }
        })
        //
        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 1,
            message: "Api request faild"
        }
    }
}

export default {
    auth,
    search,
    revalidate,
    refund,
    reserve,
    issue,
    details,
    ticket
}