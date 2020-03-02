import {HttpServerModule} from "@arck/http/server/module";
import {HttpServer} from "@arck/http/server";

export class SimpleLoggerModule implements HttpServerModule {
    onMount(server: HttpServer) {
        server.events
            .on("httpListening", (port, host) => {
                console.log(`bind [http] on ${host}:${port}`);
            })
            .on("httpsListening", (port, host) => {
                console.log(`bind [https] on ${host}:${port}`)
            })
            .on("error", (err) => {
                console.error("ups.", err);
            });
    }

}