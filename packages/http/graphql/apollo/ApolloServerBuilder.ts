import Container, {Service, Inject} from "@arck/core/di";
import {ApolloServer} from "apollo-server-express";
import {SchemaConfig} from "../../config";
import {SchemaBuilder} from "../schema";
import {ContextProvider} from "../provider";

@Service()
export class ApolloServerBuilder {
    constructor(
        private config: SchemaConfig,
        private schemaBuilder: SchemaBuilder
    ) {
    }

    public async build() {
        let contextProvider = Container.get(this.config.settings.context.provider) as ContextProvider;

        return new ApolloServer({
            schema: await this.schemaBuilder.build(true),
            context: async ({ req, res, connection, payload }: any) => {
                return await contextProvider.buildContext(req, res, { connection, payload });
            },
            subscriptions: {
                onConnect: async (connectionParams: any, webSocket: any) => {
                    if(contextProvider.fillSubscriptionContext)
                        return contextProvider.fillSubscriptionContext(connectionParams, webSocket);

                    return {};
                }
            }
        });
    }
}