import {DslTagProperties} from "./DslTagProperties";
import {DslTagType} from "./DslTagType";

export class DslTag<T extends DslTagProperties> implements DslTagType<T> {
    public constructor(public properties: T) { }
}