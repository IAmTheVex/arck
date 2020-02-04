import { Interface } from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import {HelloCommandShell} from "../shells/commands/HelloCommandShell";

export default class HelloCommand extends CommandWrapper {
    static description = "just a simple command";

    static examples = [
        `$ arck-demo hello
hello world from ./src/hello.ts!
`,
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" }),
        // flag with a value (-n, --name=VALUE)
        name: Interface.flags.string({ char: "n", description: "name to print" }),
        // flag with no value (-f, --force)
        force: Interface.flags.boolean({ char: "f" })
    };

    static args = [{ name: "file" }];

    public file?: string;
    public name: string;
    public force: boolean;

    async run() {
        const { args, flags } = this.parse(HelloCommand);

        this.name = flags.name || "world";
        this.file = args.file;
        this.force = flags.force;

        await this.passExecutionToShell(HelloCommandShell);
    }
}