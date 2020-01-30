import {ConfigItem} from "../ConfigItem";
import {DslHandlerRegistry} from "../../dsl/handler";
import {ConfigItemProperties} from "../ConfigItemProperties";
import {ConfigRegistry} from "../ConfigRegistry";

export type ConfigurationChildren = any;

export interface ConfigurationProperties extends ConfigItemProperties<ConfigurationChildren> {
    name?: string;
}

export class Configuration extends ConfigItem<ConfigurationProperties> {
    public name?: string;

    constructor(properties: ConfigurationProperties) {
        super(properties);

        this.name = this.properties.name;
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(Configuration);