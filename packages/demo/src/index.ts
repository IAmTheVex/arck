import arck from "@arck/core";

import Container, { Service, Inject } from "@arck/core/di";

import "./test";

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
        private testService: TestService
    ) {
    }

    public demo() {
        this.testService.test();
    }
}

Container.get(DemoService).demo();