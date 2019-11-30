import { Shell, ShellWrap } from "@arck/core/di";
import { ConfigLoader, DataSource } from "@arck/core/config";

@Shell
export class ArckShell implements ShellWrap {

  constructor(
    private configLoader: ConfigLoader
  ) { }

  public run() {
    console.log("hello!!");
    console.log(this.configLoader.load().getChildrenOfType(DataSource).find(ds => ds.input.name == "default"));
  }
}