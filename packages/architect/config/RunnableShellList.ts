import {ConfigItem, ConfigItemProperties} from "@arck/core/config";
import {ConfigItemWrapper} from "@arck/core/config/ConfigItemWrapper";
import {RunnableShellItem} from "./RunnableShellItem";
import {ConfigRegistry} from "@arck/core/config/ConfigRegistry";
import {AnyClassConstructor} from "@arck/core/reflection";
import {RunnableShell} from "../shell";


export type RunnableShellListChildren = RunnableShellItem[];

export interface RunnableShellListProperties extends ConfigItemProperties<RunnableShellListChildren> { }
export class RunnableShellList extends ConfigItem<RunnableShellListProperties> { }

export class RunnableShellListWrapper extends ConfigItemWrapper<RunnableShellList> {
    public items: { [name: string]: RunnableShellItem } = {};

    constructor(tag: RunnableShellList) {
        super(tag);

        for(let configItem of tag.properties.children || []) {
            if(!configItem.name || configItem.name.trim().length == 0) {
                configItem.name = (<Function>configItem.shell).name;
            }
            this.items[configItem.name] = configItem;
        }
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(RunnableShellList, RunnableShellListWrapper);