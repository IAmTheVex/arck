import {DslTagConstructor} from "./tag/DslTagConstructor";

export function createDslNode(...args: any[]) {
    let [ constructor, properties, ...children ] = args as [ DslTagConstructor<any>, any, ...any[] ];
    console.log(constructor, properties, children);
    console.log(new constructor({ ...properties, children }));
}