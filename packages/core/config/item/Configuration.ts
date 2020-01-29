import {ConfigItem} from "../ConfigItem";
import {ConfigItemHandler} from "../ConfigItemHandler";
import {DslHandlerRegistry} from "../../dsl/handler";
import {ConfigItemProperties} from "../ConfigItemProperties";

export type ConfigurationChildren = any;

export interface ConfigurationProperties extends ConfigItemProperties<ConfigurationChildren> {
}

export class Configuration extends ConfigItem<ConfigurationProperties> {

}

export class ConfigurationHandler extends ConfigItemHandler<Configuration> {
    handle(tag: Configuration): void {
        console.log(`[ConfigurationHandler]`);
    }
}

DslHandlerRegistry.register(Configuration, ConfigurationHandler);