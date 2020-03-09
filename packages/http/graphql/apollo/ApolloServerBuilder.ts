import Container, {Service, Inject} from "@arck/core/di";
import {ApolloServer} from "apollo-server-express";
import {SchemaConfig} from "../../config";
import {SchemaBuilder} from "../schema";
import {ContextProvider} from "../provider";
import {GraphQLError} from "../";
import {ErrorCodes} from "../errors";

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
            playground: this.config.settings.enablePlayground ?? false,
            tracing: this.config.settings.enableTracing ?? false,
            schema: await this.schemaBuilder.build(true),
            // @ts-ignore
            context: async ({ req, res, connection, payload }) => {
                return await contextProvider.buildContext(req, res, { connection, payload });
            },
            subscriptions: {
                onConnect: async (connectionParams: any, webSocket: any) => {
                    if(contextProvider.fillSubscriptionContext)
                        return contextProvider.fillSubscriptionContext(connectionParams, webSocket);

                    return {};
                }
            },
            formatError: (error: GraphQLError) => {
                try {
                    if (error?.extensions?.code === ErrorCodes.VALIDATION_FAILED) {
                        const errMessages = error?.extensions?.validationErrors?.map((valErr: any) =>
                            valErr.map((err: any) => err.message)
                        );
                        return new GraphQLError(
                            errMessages[0].map((message: string) => message.replace('input.', '').replace('data.', ''))
                        );
                    }
                    if (
                        error?.extensions?.code !== ErrorCodes.UNKNOWN
                    ) {
                        return new GraphQLError(error.message);
                    }
                    if (error?.extensions?.exception?.name === 'ValidationError') {
                        return new GraphQLError(
                            error?.extensions?.exception?.errors
                                .reverse()
                                .map((message: string) => message.replace('input.', '').replace('data.', ''))
                        );
                    }
                    if (error?.extensions?.exception?.isRateLimitError) {
                        return new GraphQLError('Too many requests, please try again later.');
                    }
                } catch (e) {
                }
                return new GraphQLError(`Internal Error`);
            }
        });
    }
}