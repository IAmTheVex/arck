import {ConfigItem, ConfigItemProperties} from "@arck/core/config";
import {ConfigItemWrapper} from "@arck/core/config/ConfigItemWrapper";
import {RunnableShellItem} from "./RunnableShellItem";
import {ConfigRegistry} from "@arck/core/config/ConfigRegistry";

export type ProjectConfigChildren = void;

export interface ProjectProperties extends ConfigItemProperties<ProjectConfigChildren> {
    configFileName?: string;
    includeFileFromConfigFiles?: boolean;
    buildCache?: boolean;
}
export class Project extends ConfigItem<ProjectProperties> { }

export class ProjectConfig extends ConfigItemWrapper<Project> implements Omit<ProjectProperties, "children"> {
    public items: { [name: string]: RunnableShellItem } = {};

    configFileName: string;
    includeFileFromConfigFiles: boolean;
    buildCache: boolean;

    constructor(tag: Project) {
        super(tag);

        this.configFileName = tag.properties.configFileName ?? "tsconfig.json";
        this.includeFileFromConfigFiles = tag.properties.includeFileFromConfigFiles ?? true;
        this.buildCache = tag.properties.buildCache  ?? false;
    }

}

ConfigRegistry.registerDefaultConfigurationHandler(Project, ProjectConfig);