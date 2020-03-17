import "@arck/core";

import {Interface} from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import {BuildCommandShell} from "../../../../graphql/schema/commands/BuildCommandShell";

export default class BuildCommand extends CommandWrapper {
    static description = "run a the build process for the schema";

    static examples = [
        `$ ... arck:http:schema:build`
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" })
    };

    async run() {
        const { flags } = this.parse(BuildCommand);

        await this.passExecutionToShell(BuildCommandShell);
    }
}
