import {Service} from "@arck/core/di";
import {HttpServerModule} from "../../server/module";
import {HttpServer} from "../../server";
import {ApolloServerBuilder} from "./ApolloServerBuilder";

@Service()
export class ApolloServerModule implements HttpServerModule {
    constructor(
        private apolloBuilder: ApolloServerBuilder
    ) {
    }

    onMount(server: HttpServer) {

        server.events.on("afterBackboneCreate", async () => {
            let apollo = await this.apolloBuilder.build();

            console.log("ApolloServerModule:core mounted");
            apollo.applyMiddleware({
                app: server.backbone
            });
        });

        server.events.on("afterHttpCreate", async () => {
            let apollo = await this.apolloBuilder.build();

            console.log("ApolloServerModule:subscriptions:http mounted");
            apollo.installSubscriptionHandlers(server.http);
        });

        server.events.on("afterHttpsCreate", async () => {
            if(!!server.https) {
                let apollo = await this.apolloBuilder.build();

                console.log("ApolloServerModule:subscriptions:https mounted");
                apollo.installSubscriptionHandlers(server.https);
            }
        });
    }
}