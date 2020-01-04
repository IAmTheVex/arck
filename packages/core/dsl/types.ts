import {DslTagType} from "./tag/DslTagType";

declare global {
    namespace JSX {
        interface ElementClass extends DslTagType { }

        interface ElementAttributesProperty {
            properties: { };
        }

        interface ElementChildrenAttribute {
            children: { };
        }
    }
}