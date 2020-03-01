import "@arck/core";

import {Interface} from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import sh from "@arck/cli/shell";
import {LoaderPathProviders} from "@arck/core/reflection";

export default class StudioCommand extends CommandWrapper {
    static description = "runs the prisma studio";

    static examples = [
        `$ ... arck:prisma:studio`
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" })
    };

    async run() {
        const { flags } = this.parse(StudioCommand);

        sh.cd(LoaderPathProviders.ProjectPath.providePath("db"));
        sh.exec("prisma2 studio --experimental");
    }
}