import "reflect-metadata";

import Container from "@arck/core/di";
import {registerDI, TestClass} from "@testdeck/core";

registerDI({
    handles<T>(cls: TestClass<T>): boolean {
        return true;
    },
    create<T>(cls: TestClass<T>): T {
        return Container.get(cls);
    }
});
