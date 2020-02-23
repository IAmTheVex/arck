import {CommandShell} from "@arck/cli/wrapper/CommandShell";
import RunCommand from "../commands/arck/architect/run";
import {Shell} from "../shell";
import {CodeLoader} from "@arck/core/reflection";
import {DslParser} from "@arck/core/dsl";
import Container from "@arck/core/di";
import BuildCommand from "../commands/arck/architect/build";
import {Configuration} from "@arck/core/config";
import {BuildManager} from "../build/manager";

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

        let buildManager = Container.get(BuildManager);

        if(!!cmd.buildGroupName) {
            let buildGroup = buildManager.getBuildGroupByName(cmd.buildGroupName);
            buildManager.executeGroup(buildGroup);
        } else {
            buildManager.executeDefaultGroup();
        }
    }
}