import {ConfigItem, ConfigItemProperties, ConfigItemWrapper, ConfigRegistry} from "@arck/core/config";
import {RunnableShellItem} from "./RunnableShellItem";
import {Project} from "./Project";
import {BuildGroupList} from "./BuildGroupList";

export type BuildConfigChildren = (Project | BuildGroupList)[];

export interface BuildProperties extends ConfigItemProperties<BuildConfigChildren> { }
export class Build extends ConfigItem<BuildProperties> { }

export class BuildConfig extends ConfigItemWrapper<Build> {
    public items: { [name: string]: RunnableShellItem } = {};

    constructor(tag: Build) {
        super(tag);

    }
}

ConfigRegistry.registerDefaultConfigurationHandler(Build, BuildConfig);