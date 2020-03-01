import {PrismaClient} from "@prisma/client";
import {DMMF} from "@prisma/client/runtime";

import {Service} from "@arck/core/di";
import {PrismaConfig} from "../config";

@Service()
export class DMMFProcessor {
    constructor(
        private config: PrismaConfig
    ) {

    }


    public getFromClient(client: PrismaClient = this.config.provider()): DMMF.Document {
        return (client as any).dmmf as DMMF.Document;
    }
}