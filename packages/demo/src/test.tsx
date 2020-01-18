import arck from "@arck/core";
import {DslTagProperties, DslTag, DslHandler, DslHandlerRegistry} from "@arck/core/dsl";

class A {

}

type BChildrenType = A | string | number | null;

interface BProperties extends DslTagProperties<BChildrenType> {
}

class B extends DslTag<BProperties> {

}

class BHandler extends DslHandler<B> {
    handle(tag: B) {
        return tag.properties.children;
    }
}

DslHandlerRegistry.register(B, BHandler);
let x = DslHandlerRegistry.get(B);
console.log("children", x.handle(<B>
    cacaca
</B>));


export default (
    <B>
        aaaaaa
        {3 + 5}
        {null}
        {new A()}
    </B>
);