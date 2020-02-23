import {RunnableShell} from "../shell";

export abstract class BuildShell extends RunnableShell<void, void> {
    public async run() { }

    public async preBuild(): Promise<void> {}

    public async postBuild(): Promise<void> {}

    abstract build(): Promise<void>;
}