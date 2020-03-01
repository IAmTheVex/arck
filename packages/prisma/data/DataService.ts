import {Service} from "@arck/core/di";
import {PrismaConfig} from "../config";
import {PrismaClient} from "@prisma/client";

@Service()
export class DataService {
    public client: PrismaClient;

    constructor(
        public config: PrismaConfig
    ) {
        this.client = config.provider();
    }
}

export type DataClient = PrismaClient;