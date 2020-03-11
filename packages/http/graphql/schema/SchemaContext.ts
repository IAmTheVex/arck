import {express} from "../../express";
import {ExecutionParams} from "../subscription/engine";
import {PrismaClient} from "@prisma/client";
import { PubSub } from "../subscription";

export interface SchemaContext {
    http: {
        request: express.Request,
        response: express.Response
    },
    subscription: {
        connection?: ExecutionParams,
        payload?: any
    },
    prisma: PrismaClient,
    pubSub: PubSub
}