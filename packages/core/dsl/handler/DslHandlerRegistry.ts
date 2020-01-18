import {DslTag} from "../tag";
import {DslHandler} from "./DslHandler";
import {AnyClassConstructor} from "../../reflection";
import Container from "../../di";

export class DslHandlerRegistry {
    public static register<T extends DslTag<any>, Q extends DslHandler<T>>(tagConstructor: AnyClassConstructor<T>, handlerConstructor: AnyClassConstructor<Q>) {
        Container.set(tagConstructor, handlerConstructor);
    }

    public static get<T extends DslTag<any> = DslTag<any>>(tagConstructor: AnyClassConstructor<T>): DslHandler<T> {
        return (<any>Container.get(tagConstructor)) as DslHandler<T>;
    }
}