import "@arck/core";

import Container, { Service, Inject } from "@arck/core/di";
import {CodeLoader, LoaderPathProviders} from "@arck/core/reflection";

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
        console.log(LoaderPathProviders.ProjectPath.providePath("arck.tsx"));
        console.log(this.codeLoader.prepare("arck.tsx").load());
    }
}

Container.get(DemoService).demo();