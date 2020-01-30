import {AnyClassConstructor} from "../reflection";
import Container from "../di";
import {ConfigItem} from "./ConfigItem";
import {ConfigItemHandler} from "./ConfigItemHandler";
import {DslHandlerRegistry} from "../dsl/handler";

export class ConfigRegistry {
    public static registerDefaultConfigurationHandler<T extends ConfigItem<any>>(constructor: AnyClassConstructor<T>) {
        DslHandlerRegistry.register(constructor, this.buildDefaultConfigurationHandler(constructor));
    }

    public static buildDefaultConfigurationHandler<T extends ConfigItem<any>>(constructor: AnyClassConstructor<T>) {
        return (class extends ConfigItemHandler<T> {
            handle(tag: T) {
                ConfigRegistry.register(constructor, tag);
            }
        });
    }

    public static register<T extends ConfigItem<any>>(constructor: AnyClassConstructor<T>, instance: T) {
        Container.set(constructor, instance);
    }

    public static get<T extends ConfigItem<any>>(constructor: AnyClassConstructor<T>): T {
        return (<any>Container.get(constructor)) as T;
    }
}