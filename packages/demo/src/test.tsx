import arck from "@arck/core";
import {DslTagProperties} from "@arck/core/dsl";
import {DslTag} from "@arck/core/dsl/tag/DslTag";

class A {

}

type BChildrenType = A | string | number | null;

interface BProperties extends DslTagProperties<BChildrenType> {
}

class B extends DslTag<BProperties> {

}

export default (
    <B>
        {"aaaaaa"}
        {3 + 5}
        {null}
        {new A()}
    </B>
);