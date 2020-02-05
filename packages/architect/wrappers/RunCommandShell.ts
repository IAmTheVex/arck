import {CommandShell} from "@arck/cli/wrapper/CommandShell";
import RunCommand from "../commands/arck/architect/run";
import {Shell, ShellRunner} from "../shell";
import {CodeLoader} from "@arck/core/reflection";
import {DslParser} from "@arck/core/dsl";
import {Configuration, ConfigRegistry} from "@arck/core/config";
import {RunnableShellListWrapper} from "../config";
import {RunnableShellError} from "../shell/RunnableShellError";

@Shell()
export class RunCommandShell extends CommandShell<RunCommand> {
    constructor(
        private codeLoader: CodeLoader,
        private dslParser: DslParser
    ) {
        super();
    }

    async run(cmd: RunCommand) {
        let config = this.codeLoader.prepare("arck.tsx").load<Configuration>();
        this.dslParser.parse(config);

        let list = ConfigRegistry.get(RunnableShellListWrapper);

        let shellItem = list.items[cmd.shellName!];
        if(!shellItem) {
            throw new RunnableShellError(`Could not find the shell '${cmd.shellName!}'! Please check your configuration!`);
        }

        await ShellRunner.run(shellItem.shell, shellItem.parameters);
    }
}