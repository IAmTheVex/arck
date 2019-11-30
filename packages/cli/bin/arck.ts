#!/usr/bin/env ts-node
import "@arck/core";

import { ShellRunner } from "@arck/core/di";
import { ArckShell } from "../shells/ArckShell";

(async _ => {
  try {
    console.log(await ShellRunner.run(ArckShell));
  } catch (ex) {
    console.log("shit!");
    console.log(ex);
  }
})();