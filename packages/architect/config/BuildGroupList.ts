import {ConfigItem, ConfigItemProperties, ConfigItemWrapper, ConfigRegistry} from "@arck/core/config";
import {BuildGroup} from "./BuildGroup";


export type BuildGroupListChildren = BuildGroup[];

export interface BuildGroupListProperties extends ConfigItemProperties<BuildGroupListChildren> { }
export class BuildGroupList extends ConfigItem<BuildGroupListProperties> {}

export class BuildGroupListWrapper extends ConfigItemWrapper<BuildGroupList> implements Omit<BuildGroupListProperties, "children">{
    public items: { [name: string]: BuildGroup } = {};
    public default?: BuildGroup = undefined;

    constructor(tag: BuildGroupList) {
        super(tag);

        for(let configItem of tag.properties.children || []) {
            if(!configItem.name) {
                throw new Error("BuildGroups must have a name or be marked as the default one.");
            }

            if(configItem.default) {
                if(!!this.default) {
                    throw new Error("Only one default BuildGroup can exist!");
                }

                this.default = configItem;
            }

            this.items[configItem.name] = configItem;
        }
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(BuildGroupList, BuildGroupListWrapper);