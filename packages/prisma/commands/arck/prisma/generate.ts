import "@arck/core";

import {Interface} from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import sh from "@arck/cli/shell";
import {LoaderPathProviders} from "@arck/core/reflection";

export default class GenerateCommand extends CommandWrapper {
    static description = "runs the prisma codegen";

    static examples = [
        `$ ... arck:prisma:generate`
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" }),
        watch: Interface.flags.boolean({ char: "w", required: false, description: "run in watch mode" })
    };

    async run() {
        const { flags } = this.parse(GenerateCommand);

        sh.cd(LoaderPathProviders.ProjectPath.providePath("db"));
        sh.exec(`prisma2 generate ${flags.watch ? "--watch" : ""}`);
    }
}