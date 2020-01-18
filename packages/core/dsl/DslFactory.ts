import {DslTagConstructor} from "./tag/DslTagConstructor";

export function createDslNode(...args: any[]) {
    let [ constructor, properties, ...children ] = args as [ DslTagConstructor<any>, any, ...any[] ];
    return new constructor({ ...properties, children });
}