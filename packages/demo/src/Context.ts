import {SchemaContext} from "@arck/http/graphql/schema";
import {DataClient} from "@arck/prisma/data";
import {User} from "@prisma/client";

export interface Context extends SchemaContext {
    data: DataClient;
    user?: User;
    userId?: string;
}
