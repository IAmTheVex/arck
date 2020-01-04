import {DslTagProperties} from "./DslTagProperties";

export interface DslTagType<T extends DslTagProperties = DslTagProperties> {
    properties: T;
}