import {ConfigItem, ConfigItemProperties} from "@arck/core/config";
import {RunnableShellList} from "./RunnableShellList";

export type RuntimeConfigChildren = (RunnableShellList)[];

export interface RuntimeProperties extends ConfigItemProperties<RuntimeConfigChildren> { }
export class Runtime extends ConfigItem<RuntimeProperties> { }