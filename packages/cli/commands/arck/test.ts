import {Interface} from "../../";
import {CommandWrapper} from "../../wrapper";

export default class TestCommand extends CommandWrapper {
    static description = "just a simple command from arck";

    static examples = [
        `$ arck-demo arck:test
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

    async run() {
        const { args, flags } = this.parse(TestCommand);

        const name = flags.name || "world";
        this.log(`hello ${name} from ./src/commands/hello.ts`);
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}