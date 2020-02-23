import {ConfigItem, ConfigItemProperties, ConfigItemWrapper, ConfigRegistry} from "@arck/core/config";
import {RunnableShellItem} from "./RunnableShellItem";


export type RunnableShellListChildren = RunnableShellItem[];

export interface RunnableShellListProperties extends ConfigItemProperties<RunnableShellListChildren> { }
export class RunnableShellList extends ConfigItem<RunnableShellListProperties> { }

export class RunnableShellListWrapper extends ConfigItemWrapper<RunnableShellList> implements Omit<RunnableShellListProperties, "children">{
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