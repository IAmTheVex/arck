import { ShellWrap, Shell } from "@arck/core/di";
import { ConfigLoader } from "@arck/core/config";
import {TestConfig} from "../TestConfig";

@Shell
export class TestShell implements ShellWrap {
  constructor(
    private configLoader: ConfigLoader
  ) { }

  public run() {
    console.log("this is shell!");
    let config = this.configLoader.load();
    console.log(config.getChildrenOfType(TestConfig));
  }
}