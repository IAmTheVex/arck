import {ConfigItem, ConfigItemProperties, ConfigItemWrapper} from "@arck/core/config";
import {BuildItem} from "./BuildItem";

export type BuildGroupChildren = BuildItem[];

export interface BuildGroupProperties extends ConfigItemProperties<BuildGroupChildren> {
    name?: string;
    default?: boolean;
}
export class BuildGroup extends ConfigItem<BuildGroupProperties> implements Omit<BuildGroupProperties, "children"> {
    name?: string;
    default: boolean;

    constructor(properties: BuildGroupProperties) {
        super(properties);

        this.default = properties.default ?? false;

        this.name = properties.name;
        if(this.default) {
            this.name = "default";
        }
    }
}

export class BuildGroupWrapper extends ConfigItemWrapper<BuildGroup> implements Omit<BuildGroupProperties, "children"> {
    public items: { [name: string]: BuildItem } = {};
    public itemList: BuildItem[] = [];

    public name?: string;
    public default: boolean;

    constructor(tag: BuildGroup) {
        super(tag);

        this.name = tag.name;
        this.default = tag.default;

        for (let configItem of tag.properties.children || []) {
            this.itemList.push(configItem);

            if (!configItem.name || configItem.name.trim().length == 0) {
                configItem.name = (<Function>configItem.shell).name;
            }

            this.items[configItem.name] = configItem;
        }
    }
}
