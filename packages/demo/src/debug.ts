import {RunnableShell, Shell, ShellRunner} from "@arck/architect/shell";
import {Simple2RunnableShell} from "./shells/Simple2RunnableShell";

@Shell()
export class DebugRunnableShell extends RunnableShell {
    public async run() {
        // TODO: Load config

        // do what you want in here!

        return await ShellRunner.run(Simple2RunnableShell);
    }
}

ShellRunner.run(DebugRunnableShell)
    .then(console.log)
    .catch(console.error);