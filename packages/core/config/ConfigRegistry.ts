import {AnyClassConstructor} from "../reflection";
import Container from "../di";
import {ConfigItem} from "./ConfigItem";
import {ConfigItemHandler} from "./ConfigItemHandler";
import {DslHandlerRegistry} from "../dsl/handler";
import {ConfigItemWrapper} from "./ConfigItemWrapper";

export class ConfigRegistry {
    public static registerDefaultConfigurationHandler<T extends ConfigItem<any>, Q extends ConfigItemWrapper<T>>(constructor: AnyClassConstructor<T>, wrapperConstructor: AnyClassConstructor<Q>) {
        DslHandlerRegistry.register(constructor, this.buildDefaultConfigurationHandler(constructor, wrapperConstructor));
    }

    public static buildDefaultConfigurationHandler<T extends ConfigItem<any>, Q extends ConfigItemWrapper<T>>(constructor: AnyClassConstructor<T>, wrapperConstructor: AnyClassConstructor<Q>) {
        return (class extends ConfigItemHandler<T> {
            handle(tag: T) {
                ConfigRegistry.register(wrapperConstructor,  new wrapperConstructor(tag));
            }
        });
    }

    public static register<T extends ConfigItemWrapper<any>>(constructor: AnyClassConstructor<T>, instance: T) {
        Container.set(constructor, instance);
    }

    public static get<T extends ConfigItem<any>>(constructor: AnyClassConstructor<T>): T {
        return (<any>Container.get(constructor)) as T;
    }
}