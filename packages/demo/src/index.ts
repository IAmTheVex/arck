import "@arck/core";

import Container, { Service, Inject } from "@arck/core/di";
import {CodeLoader, LoaderPathProviders} from "@arck/core/reflection";
import {DslParser} from "@arck/core/dsl";
import {Configuration} from "@arck/core/config";

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
        private codeLoader: CodeLoader,
        private dslParser: DslParser
    ) {
    }

    public demo() {
        this.testService.test();
        let config = this.codeLoader.prepare("arck.tsx").load<Configuration>();
        this.dslParser.parse(config);

    }
}

Container.get(DemoService).demo();