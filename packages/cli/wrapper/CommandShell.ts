import {RunnableShell} from "@arck/architect/shell";
import {CommandWrapper} from "./CommandWrapper";

export abstract class CommandShell<T extends CommandWrapper, Q = void> extends RunnableShell<T, Q> { }