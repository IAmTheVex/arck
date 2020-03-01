import "@arck/core";

import {Interface} from "@arck/cli";
import { CommandWrapper } from "@arck/cli/wrapper";
import sh from "@arck/cli/shell";
import {LoaderPathProviders} from "@arck/core/reflection";

export default class IntrospectCommand extends CommandWrapper {
    static description = "runs the prisma introspection";

    static examples = [
        `$ ... arck:prisma:introspect`
    ];

    static flags = {
        help: Interface.flags.help({ char: "h" })
    };

    async run() {
        const { flags } = this.parse(IntrospectCommand);

        sh.cd(LoaderPathProviders.ProjectPath.providePath("db"));
        sh.exec("prisma2 introspect");
    }
}