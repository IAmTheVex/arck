import { ShellWrap, Shell } from "@arck/core/di";
import { ConfigLoader } from "@arck/core/config";

@Shell
export class TestShell implements ShellWrap {
  constructor(
    private configLoader: ConfigLoader
  ) { }

  public run() {
    console.log("this is shell!");
    console.log(this.configLoader.load());
  }
}