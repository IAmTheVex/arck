import {DslTagProperties, DslTag, DslHandler, DslHandlerRegistry, DslParser} from "@arck/core/dsl";
import {Service} from "@arck/core/di";

export class A {

}

export type BChildrenType = A | string | number | null;

export interface BProperties extends DslTagProperties<BChildrenType> {
    a: string;
}

export class B extends DslTag<BProperties> {
}

@Service()
export class BHandler extends DslHandler<B> {

    handle(tag: B) {
        console.log(tag.properties);
    }
}
DslHandlerRegistry.register(B, BHandler);