import {ConfigItem} from "./ConfigItem";
import {DslHandler} from "../dsl/handler";

export abstract class ConfigItemHandler<T extends ConfigItem<any>> extends DslHandler<T> { }