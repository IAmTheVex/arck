import "@arck/core";

import Container, { Service, Inject } from "@arck/core/di";
import {CodeLoader, LoaderPathProviders} from "@arck/core/reflection";
import {DslParser} from "@arck/core/dsl";
import {Configuration, ConfigurationWrapper} from "@arck/core/config";
import {Shell, RunnableShell, ShellRunner} from "@arck/architect/shell";

Container.set("test.key", "bla bla");

@Service()
class TestService {
    @Inject("test.key") private key: string;

    public test() {
        console.log(`test key: ${this.key}`);
    }
}

@Shell()
class DemoShell extends RunnableShell<{ a: number, b: number }, { sum: number }> {
    @Inject() test: TestService;

    async run({a, b}: { a: number, b: number }) {
        this.test.test();
        return {sum: a + b};
    }
}

ShellRunner.run<DemoShell, { a: number, b: number }, { sum: number }>(DemoShell, { a: 3, b: 5 }).then(console.log);

//
// @Service()
// class DemoService {
//     constructor(
//         private testService: TestService,
//         private codeLoader: CodeLoader,
//         private dslParser: DslParser
//     ) {
//     }
//
//     public demo() {
//         this.testService.test();
//         let config = this.codeLoader.prepare("arck.tsx").load<Configuration>();
//         this.dslParser.parse(config);
//     }
// }
//
// @Service()
// class TestShell {
//     @Inject() config: ConfigurationWrapper;
//
//     public test() {
//         console.log(this.config.name);
//     }
// }
//
// Container.get(DemoService).demo();