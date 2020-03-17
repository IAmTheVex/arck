import "@arck/core";

import {Interface} from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import sh from "@arck/cli/shell";
import {LoaderPathProviders} from "@arck/core/reflection";

export default class MigrationSaveCommand extends CommandWrapper {
    static description = "runs the prisma migration save";

    static examples = [
        `$ ... arck:prisma:migrate:save`
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" }),
        name: Interface.flags.string({ char: "n", required: true, description: "name of the migration"})
    };

    async run() {
        const { flags } = this.parse(MigrationSaveCommand);

        sh.cd(LoaderPathProviders.ProjectPath.providePath("db"));
        let result = sh.exec(`prisma2 migrate save --experimental --create-db --name ${flags.name}`, { silent: true });

        console.log(result.replace(/^.*Prisma2.*$/img, "").replace(/^.*Prisma.*$/mg, "").replace(/\n\s*\n/g, '\n\n'));
    }
}
