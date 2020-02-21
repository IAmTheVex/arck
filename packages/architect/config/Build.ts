import {ConfigItem, ConfigItemProperties} from "@arck/core/config";
import {ConfigItemWrapper} from "@arck/core/config/ConfigItemWrapper";
import {RunnableShellItem} from "./RunnableShellItem";
import {ConfigRegistry} from "@arck/core/config/ConfigRegistry";
import {Project} from "./Project";

export type BuildConfigChildren = Project;

export interface BuildProperties extends ConfigItemProperties<BuildConfigChildren> { }
export class Build extends ConfigItem<BuildProperties> { }

export class BuildConfig extends ConfigItemWrapper<Build> {
    public items: { [name: string]: RunnableShellItem } = {};

    constructor(tag: Build) {
        super(tag);

    }
}

ConfigRegistry.registerDefaultConfigurationHandler(Build, BuildConfig);