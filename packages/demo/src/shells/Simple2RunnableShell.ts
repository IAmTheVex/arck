import {RunnableShell, Shell} from "@arck/architect/shell";
import {Inject} from "@arck/core/di";
import {ConfigurationWrapper} from "@arck/core/config";
import {BuildManager} from "@arck/architect/build/manager";

@Shell()
export class Simple2RunnableShell extends RunnableShell {
    @Inject() configuration: ConfigurationWrapper;
    @Inject() buildManager: BuildManager;

    public async run() {
        // console.log(this.configuration.name);

        let buildGroup = this.buildManager.getBuildGroupByName("OnlyTest1");
        this.buildManager.executeGroup(buildGroup);
    }
}