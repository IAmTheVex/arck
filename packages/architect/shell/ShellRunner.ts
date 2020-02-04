import {RunnableShell} from "./RunnableShell";
import {AnyClassConstructor} from "@arck/core/reflection";
import {Container} from "@arck/core/di";

export class ShellRunner {
    public static async run<T extends RunnableShell<TParams, TResult>, TParams, TResult>(constructor: AnyClassConstructor<T>, params?: TParams): Promise<TResult> {
        let shell = Container.get(constructor);
        return await shell.run(params);
    }
}