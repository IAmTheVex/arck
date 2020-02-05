import {RunnableShell, Shell} from "@arck/architect/shell";

@Shell()
export class SimpleRunnableShell extends RunnableShell {
    public async run() {
        let a = 30;

        console.log("hello there!", a);
    }
}