import Container, {Service, Inject} from "@arck/core/di";
import {express} from "../express";
import {HttpConfig} from "../config";

import * as http from "http";
import * as https from "https";

import {useExpressServer, useContainer} from "../core";
import {EventsEmitter} from "@arck/core/events";

useContainer(Container);

export interface HttpServerEvents {
    beforeBackboneCreate(): void;
    afterBackboneCreate(): void;

    beforeCoreAttach(): void;
    afterCoreAttach(): void;

    beforeHttpCreate(): void;
    afterHttpCreate(): void;

    beforeHttpsCreate(): void;
    afterHttpsCreate(): void;

    httpListening(port: number, hostname: string): void;
    httpsListening(port: number, hostname: string, options: https.ServerOptions): void;

    httpError(error: Error): void;
    httpsError(error: Error): void;

    error(error: Error): void;
}

@Service()
export class HttpServer {
    public backbone: express.Express;
    public http: http.Server;
    public https?: https.Server;

    public events = EventsEmitter.for<HttpServerEvents>();

    constructor(
        public config: HttpConfig
    ) {
        let modules = this.config.settings.modules ?? [];
        for(let module of modules) {
            let moduleInstance = Container.get(module);
            moduleInstance.onMount(this);
        }

        this.events.emit("beforeBackboneCreate");
        this.backbone = express();
        this.events.emit("afterBackboneCreate");

        this.events.emit("beforeCoreAttach");
        useExpressServer(this.backbone, this.config.settings);
        this.events.emit("afterCoreAttach");

        this.events.emit("beforeHttpCreate");
        this.http = http.createServer(this.backbone);
        this.events.emit("afterHttpCreate");

        if(!!this.config.settings.https) {
            this.events.emit("beforeHttpsCreate");
            this.https = https.createServer(this.config.settings.https, this.backbone);
            this.events.emit("afterHttpsCreate");
        }
    }

    public async listen() {
        let { httpPort, httpsPort, host } = this.config.settings.listen;
        host = host ?? "127.0.0.1";
        httpsPort = httpsPort ?? 443;

        this.http
            .on("error", (err) => {
                this.events.emit("httpError", err);
                this.events.emit("error", err);
            })
            .on("listening", () => {
                this.events.emit("httpListening", httpPort, host!!);
            })
            .listen(httpPort, host);

        if(!!this.https) {
            this.https
                .on("error", (err) => {
                    this.events.emit("httpsError", err);
                    this.events.emit("error", err);
                })
                .on("listening", () => {
                    this.events.emit("httpsListening", httpsPort!!, host!!, this.config.settings.https!!);
                })
                .listen(httpsPort, host);
        }
    }

}