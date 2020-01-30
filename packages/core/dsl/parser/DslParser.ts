import {DslTag} from "../tag";
import {DslHandler, DslHandlerRegistry} from "../handler";
import {Service} from "../../di";

@Service()
export class DslParser {

    public parse(rootTag: DslTag<any>) {
        this.handle(rootTag);
    }

    protected handlerOf(tag: DslTag<any>): DslHandler<DslTag<any>> {
        return DslHandlerRegistry.get((<any>tag).constructor);
    }

    protected handle(tag: DslTag<any>) {
        let handler = this.handlerOf(tag);
        if(!!handler && handler instanceof DslHandler) {
            handler.handle(tag);
        }

        for(let child of (tag.properties || {}).children || []) {
            this.handle(child);
        }
    }

}