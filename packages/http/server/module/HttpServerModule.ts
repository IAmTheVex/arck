import {HttpServer} from "../HttpServer";

export interface HttpServerModule {
    onMount(server: HttpServer): void;
}