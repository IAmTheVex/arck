import {CommandShell} from "@arck/cli/wrapper/CommandShell";
import {Shell} from "@arck/architect/shell";
import HelloCommand from "../../commands/hello";

@Shell()
export class HelloCommandShell extends CommandShell<HelloCommand> {
    public async run(cmd: HelloCommand) {
        cmd.log(`hello ${cmd.name} from ./src/commands/hello.ts`);

        if (cmd.file && cmd.force) {
            cmd.log(`you input --force and --file: ${cmd.file}`);
        }
    }
}