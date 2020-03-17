import "@arck/core";

import {Interface} from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import sh from "@arck/cli/shell";
import {LoaderPathProviders} from "@arck/core/reflection";

export default class CommitCommand extends CommandWrapper {
    static description = "commits the prisma schema changes";

    static examples = [
        `$ ... arck:prisma:commit`
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" }),
        name: Interface.flags.string({ char: "n", required: true, description: "name of the migration"})
    };

    private printResult(result: string) {
        console.log(result.replace(/^.*Prisma2.*$/img, "").replace(/^.*Prisma.*$/mg, "").replace(/\n\s*\n/g, '\n\n'));
    }

    async run() {
        const {flags} = this.parse(CommitCommand);

        sh.cd(LoaderPathProviders.ProjectPath.providePath("db"));
        this.printResult(sh.exec(`prisma2 migrate save --experimental --create-db --name ${flags.name}`, {silent: true}));
        this.printResult(sh.exec("prisma2 migrate up --experimental --auto-approve --create-db --verbose", {silent: true}));
    }
}
