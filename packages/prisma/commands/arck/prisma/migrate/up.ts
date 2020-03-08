import "@arck/core";

import {Interface} from "@arck/cli";
import {CommandWrapper} from "@arck/cli/wrapper";
import sh from "@arck/cli/shell";
import {LoaderPathProviders} from "@arck/core/reflection";

export default class MigrationUpCommand extends CommandWrapper {
    static description = "runs the prisma migration up";

    static examples = [
        `$ ... arck:prisma:migrate:up`
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" }),
        preview: Interface.flags.boolean({ char: "p", required: false, description: "preview the effects of the command before execution" })
    };

    async run() {
        const { flags } = this.parse(MigrationUpCommand);

        sh.cd(LoaderPathProviders.ProjectPath.providePath("db"));
        let result = sh.exec("prisma2 migrate up --experimental --auto-approve --create-db --verbose" + (flags.preview ? " --preview" : ""), { silent: true });

        console.log(result.replace(/^.*Prisma2.*$/img, "").replace(/^.*Prisma.*$/mg, "").replace(/\n\s*\n/g, '\n\n'));
    }
}