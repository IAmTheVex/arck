import {ConfigItem, ConfigItemProperties} from "@arck/core/config";
import {AnyClassConstructor} from "@arck/core/reflection";
import {BuildShell} from "../build";

export type BuildItemChildren = void;

export interface BuildItemProperties extends ConfigItemProperties<BuildItemChildren> {
    shell: AnyClassConstructor<BuildShell>;
    name?: string;
}

export class BuildItem extends ConfigItem<BuildItemProperties> implements Omit<BuildItemProperties, "children"> {
    public name: string;
    public shell: AnyClassConstructor<BuildShell>;

    constructor(properties: BuildItemProperties) {
        super(properties);

        this.shell = properties.shell;
        this.name = properties.name ?? "";
    }
}