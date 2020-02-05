import "@arck/core";

import {Interface} from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import {RunCommandShell} from "../../../wrappers/RunCommandShell";

export default class RunCommand extends CommandWrapper {
    static description = "execute a runnable shell";

    static examples = [
        `$ ... arck:architect:run --shell AbcdRunnableShell
`,
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" }),
        shell: Interface.flags.string({ char: "s", required: true, description: "name of the shell to run" })
    };

    public shellName?: string;

    async run() {
        const { flags } = this.parse(RunCommand);

        this.shellName = flags.shell;

        await this.passExecutionToShell(RunCommandShell);
    }
}