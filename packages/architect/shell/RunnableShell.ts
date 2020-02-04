export abstract class RunnableShell<TParams = any, TResult = any> {
    public abstract run(params?: TParams): Promise<TResult>;
}