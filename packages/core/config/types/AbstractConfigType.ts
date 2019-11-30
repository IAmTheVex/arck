import { IConfigInput } from "./IConfigInput";

export class AbstractConfigType<T extends IConfigInput> {
  constructor(protected input: T) { }

  public printInput() {
    console.log(this.input);
  }

  public getChildren() {
    return this.input.children;
  }

  public getChildrenOfType<Q>(ctor: { new(...args: any[]): Q }): Q[] {
    return this.getChildren().filter((x: any) => x instanceof ctor) ?? [];
  }
}