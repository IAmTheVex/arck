import {ConfigItem} from "./ConfigItem";

export class ConfigItemWrapper<T extends ConfigItem<any>> {

    constructor(public node: T) { }
}