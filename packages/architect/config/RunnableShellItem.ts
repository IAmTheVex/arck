import {ConfigItem, ConfigItemProperties} from "@arck/core/config";
import {AnyClassConstructor} from "@arck/core/reflection";
import {RunnableShell} from "../shell";

export type RunnableShellItemChildren = void;

export interface RunnableShellItemProperties extends ConfigItemProperties<RunnableShellItemChildren> {
    shell: AnyClassConstructor<RunnableShell>;
    name?: string;
    parameters?: any;
}

export class RunnableShellItem extends ConfigItem<RunnableShellItemProperties> implements Omit<RunnableShellItemProperties, "children"> {
    public name: string;
    public shell: AnyClassConstructor<RunnableShell>;
    public parameters: any;

    constructor(properties: RunnableShellItemProperties) {
        super(properties);

        this.shell = properties.shell;
        this.name = properties.name ?? "";
        this.parameters = properties.parameters ?? ({ });
    }
}