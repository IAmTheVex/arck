import "@arck/core";

import Container, { Service, Inject } from "@arck/core/di";
import {CodeLoader, GlobalModulePathProvider, LoaderPathProviders} from "@arck/core/reflection";

Container.set("test.key", "bla bla");

@Service()
class TestService {
    @Inject("test.key") private key: string;

    public test() {
        console.log(`test key: ${this.key}`);
    }
}

@Service()
class DemoService {
    constructor(
        private testService: TestService,
        private codeLoader: CodeLoader
    ) {
    }

    public demo() {
        this.testService.test();
        console.log(LoaderPathProviders.ProjectModulePath.providePath("abcd"));
        console.log(this.codeLoader.prepare("arck.tsx").load("abcd"));
    }
}

Container.get(DemoService).demo();