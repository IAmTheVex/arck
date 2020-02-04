import {Command} from "@oclif/command";
import {CommandShell} from "./CommandShell";
import {AnyClassConstructor} from "@arck/core/reflection";
import {ShellRunner} from "@arck/architect/shell";

export abstract class CommandWrapper extends Command {
    public async passExecutionToShell<T extends CommandShell<any>>(constructor: AnyClassConstructor<T>) {
        return ShellRunner.run(constructor, this);
    }
}