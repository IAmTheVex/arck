import {BuildShell} from "@arck/architect/build";
import {Shell} from "@arck/architect/shell";
import sh from "@arck/cli/shell";
import {LoaderPathProviders} from "@arck/core/reflection";

@Shell()
export class GeneratePrismaClient extends BuildShell {
    constructor(
    ) {
        super();
    }

    async build() {
        let cwd = process.cwd();
        sh.cd(LoaderPathProviders.ProjectPath.providePath("db"));

        sh.exec("prisma2 generate", { silent: true });

        sh.cd(cwd);
    }
}
