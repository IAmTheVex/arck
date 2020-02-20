import {ConfigItem, ConfigItemProperties} from "@arck/core/config";
import {ConfigItemWrapper} from "@arck/core/config/ConfigItemWrapper";
import {ConfigRegistry} from "@arck/core/config/ConfigRegistry";
import {LoaderPathProviders} from "@arck/core/reflection";

export type LocalStorageChildren = undefined;

export interface LocalStorageProperties extends ConfigItemProperties<LocalStorageChildren> {
    filename?: string;
}
export class LocalStorage extends ConfigItem<LocalStorageProperties> { }

export class LocalStorageConfig extends ConfigItemWrapper<LocalStorage> {
    public filename: string;
    public path: string;

    constructor(tag: LocalStorage) {
        if(!tag || !tag.properties) {
            throw new Error("No LocalStorage configuration was found!")
        }

        super(tag);

        this.filename = tag.properties.filename || ".arck/local-storage.json";
        this.path = LoaderPathProviders.ProjectPath.inspectPath(this.filename);
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(LocalStorage, LocalStorageConfig);