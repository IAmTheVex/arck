import "@arck/core";

import * as Interface from "@oclif/command";

export { run } from "@oclif/command";

import * as Wrapper from "./wrapper";
import * as Shell from "./shell";

const Cli = {
    Interface,
    Wrapper,
    Shell
};

export {
    Interface,
    Wrapper,
    Shell,

    Cli
};

export default Cli;