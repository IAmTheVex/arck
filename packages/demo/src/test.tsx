import arck from "@arck/core";
import {DslTagProperties, DslTag, DslHandler, DslHandlerRegistry, DslParser} from "@arck/core/dsl";
import { Service, Inject } from "@arck/core/di";

class A {

}

type BChildrenType = A | string | number | null;

interface BProperties extends DslTagProperties<BChildrenType> {
}

class B extends DslTag<BProperties> {

}

@Service()
class ABCD {
    public aa() {
        console.log("aaaaaa");
    }
}

@Service()
class BHandler extends DslHandler<B> {
    @Inject() abcd: ABCD;

    handle(tag: B) {
        this.abcd.aa();
        console.log(tag.properties.children);
    }
}

DslHandlerRegistry.register(B, BHandler);
// let x = DslHandlerRegistry.get(B);
// console.log("children", x.handle(<B>
//     cacaca
// </B>));

new DslParser().parse(<B>
    cacaca
</B>);

export default (
    <B>
        aaaaaa
        {3 + 5}
        {null}
        {new A()}
    </B>
);