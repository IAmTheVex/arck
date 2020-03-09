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

    onMount(server: HttpServer): void {
        server.events.on("afterBackboneCreate", async () => {
            console.log("ApolloServerModule mounted");
            let apollo = await this.apolloBuilder.build();
            apollo.applyMiddleware({
                app: server.backbone
            });
        });
    }
}