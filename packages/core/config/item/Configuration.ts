import {ConfigItem} from "../ConfigItem";
import {DslHandlerRegistry} from "../../dsl/handler";
import {ConfigItemProperties} from "../ConfigItemProperties";
import {ConfigRegistry} from "../ConfigRegistry";
import {ConfigItemWrapper} from "../ConfigItemWrapper";

export type ConfigurationChildren = any;

export interface ConfigurationProperties extends ConfigItemProperties<ConfigurationChildren> {
    name?: string;
}

export class Configuration extends ConfigItem<ConfigurationProperties> { }

export class ConfigurationWrapper extends ConfigItemWrapper<Configuration> {
    public name?: string;
    constructor(node: Configuration) {
        super(node);

        this.name = node.properties.name;
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(Configuration, ConfigurationWrapper);