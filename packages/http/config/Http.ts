import {ConfigItem, ConfigItemProperties, ConfigRegistry, ConfigItemWrapper} from "@arck/core/config";
import {RoutingControllersOptions} from "../core";
import {ServerOptions as HttpsServerOptions} from "https";
import {AnyClassConstructor} from "@arck/core/reflection";
import {HttpServerModule} from "../server/module";

export type HttpChildren = undefined;

export interface ServerProperties {
    https?: HttpsServerOptions;
    modules?: AnyClassConstructor<HttpServerModule>[];
}

export interface ListenProperties {
    listen: {
        httpPort: number,
        httpsPort?: number,
        host?: string
    }
}

export interface HttpProperties extends ConfigItemProperties<HttpChildren>, RoutingControllersOptions, ServerProperties, ListenProperties {
}

export class Http extends ConfigItem<HttpProperties> { }

export class HttpConfig extends ConfigItemWrapper<Http> {

    public settings: HttpProperties;

    constructor(tag: Http) {
        if(!tag || !tag.properties) {
            throw new Error("No Http configuration was found!")
        }

        super(tag);

        this.settings = tag.properties;
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(Http, HttpConfig);