export class RunnableShellError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RunnableShellError";
    }
}