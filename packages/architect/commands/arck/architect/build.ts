import "@arck/core";

import {Interface} from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import {BuildCommandShell} from "../../../wrappers/BuildCommandShell";

export default class BuildCommand extends CommandWrapper {
    static description = "run a build group";

    static examples = [
        `$ ... arck:architect:build`,
        `$ ... arck:architect:build --group AbcdGroup`,
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" }),
        group: Interface.flags.string({ char: "g", required: false, description: "name of the BuildGroup to run" })
    };

    public buildGroupName?: string;

    async run() {
        const { flags } = this.parse(BuildCommand);

        this.buildGroupName = flags.group;

        await this.passExecutionToShell(BuildCommandShell);
    }
}