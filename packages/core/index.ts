import "reflect-metadata";

import * as Fs from "./fs";
import * as Dsl from "./dsl";
import * as Di from "./di";
import * as Reflection from "./reflection";

import * as Config from "./config";

const Arck = {
    Fs,
    Dsl,
    Di,
    Reflection,

    Config
};

export {
    Fs,
    Dsl,
    Di,
    Reflection,

    Config,

    Arck
};

export default Arck;

import { makeGlobalExecutable } from "./global";
makeGlobalExecutable(Arck);