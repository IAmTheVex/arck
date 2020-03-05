import {express} from "../../express";
import {SchemaContext} from "../schema";
import {ExecutionParams} from "../subscription/engine";

export interface ContextProvider<T extends SchemaContext = any> {
    buildContext(request: express.Request, response: express.Response, subscription: { connection?: ExecutionParams<T>, payload?: any }): T | Promise<T>

    fillSubscriptionContext?(connectionParams?: any, webSocket?: any): Partial<T> | Promise<Partial<T>>;
}