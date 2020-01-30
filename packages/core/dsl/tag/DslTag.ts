import {DslTagProperties} from "./DslTagProperties";
import {DslTagType} from "./DslTagType";
import {AnyClassConstructor} from "../../reflection";

export class DslTag<T extends DslTagProperties> implements DslTagType<T> {
    public constructor(public properties: T) { }

    public getChildrenOfType<T>(constructor: AnyClassConstructor<T>): T[] {
        return this.properties.children.filter((child: any) => child instanceof constructor) || [];
    }

    public getChildOfType<T>(constructor: AnyClassConstructor<T>): T | undefined {
        return this.getChildrenOfType(constructor)[0] || undefined;
    }
}