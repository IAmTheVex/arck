import {DslTagProperties} from "./DslTagProperties";
import {DslTag} from "./DslTag";

export interface DslTagConstructor<T extends DslTagProperties = DslTagProperties> {
    new(properties: T): DslTag<T>;
}