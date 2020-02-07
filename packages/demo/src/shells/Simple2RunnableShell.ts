import {RunnableShell, Shell} from "@arck/architect/shell";

@Shell()
export class Simple2RunnableShell extends RunnableShell {
    public async run() {
        return "cacat";
    }
}