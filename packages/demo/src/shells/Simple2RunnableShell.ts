import {RunnableShell, Shell} from "@arck/architect/shell";
import {Inject} from "@arck/core/di";
import {ConfigurationWrapper} from "@arck/core/config";

@Shell()
export class Simple2RunnableShell extends RunnableShell {
    @Inject() configuration: ConfigurationWrapper;

    public async run() {
        console.log(this.configuration.name);
        return "cacat";
    }
}