import {express} from "../../express";
import {ExecutionParams} from "../subscription/engine";

export interface SchemaContext {
    http: {
        request: express.Request,
        response: express.Response
    }
    subscription: {
        connection?: ExecutionParams,
        payload?: any
    }
}