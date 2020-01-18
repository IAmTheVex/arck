import {DslTag, DslTagProperties} from "../tag";

export abstract class DslHandler<T extends DslTag<any>> {
    public abstract handle(tag: T): any;
}