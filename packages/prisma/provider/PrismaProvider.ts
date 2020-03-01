import {PrismaClient} from "@prisma/client";

export type PrismaProvider = () => PrismaClient;