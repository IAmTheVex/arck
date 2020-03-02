import "@arck/core";
import {RunnableShell, Shell, ShellRunner} from "@arck/architect/shell";
import {Simple2RunnableShell} from "./shells/Simple2RunnableShell";
import {Configuration} from "@arck/core/config";
import {Inject} from "@arck/core/di";
import {CodeLoader} from "@arck/core/reflection";
import {DslParser} from "@arck/core/dsl";
import {SimpleRunnableShell} from "./shells/SimpleRunnableShell";

@Shell()
export class DebugRunnableShell extends RunnableShell {
    @Inject() private codeLoader: CodeLoader;
    @Inject() private dslParser: DslParser;

    public async run() {
        let config = this.codeLoader.prepare("arck.tsx").load<Configuration>();
        this.dslParser.parse(config);

        // do what you want in here!

        return await ShellRunner.run(SimpleRunnableShell);
    }
}

ShellRunner.run(DebugRunnableShell)
    .then(result => `Runnable shell returned (${result})`)
    .then(console.log)
    .catch(console.error);