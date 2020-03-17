import {CommandShell} from "@arck/cli/wrapper/CommandShell";
import {Shell} from "@arck/architect/shell";
import {CodeLoader} from "@arck/core/reflection";
import {DslParser} from "@arck/core/dsl";
import Container from "@arck/core/di";
import BuildCommand from "../../../commands/arck/http/schema/build";
import {Configuration} from "@arck/core/config";
import {SchemaBuilder} from "../SchemaBuilder";

@Shell()
export class BuildCommandShell extends CommandShell<BuildCommand> {
    constructor(
        private codeLoader: CodeLoader,
        private dslParser: DslParser
    ) {
        super();
    }

    async run(cmd: BuildCommand) {
        let config = this.codeLoader.prepare("arck.tsx").load<Configuration>();
        this.dslParser.parse(config);

        let buildManager = Container.get(SchemaBuilder);
        await buildManager.staticSchema();
    }
}
