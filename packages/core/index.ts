import "reflect-metadata";

import * as Dsl from "./dsl";
import * as Di from "./di";
import * as Reflection from "./reflection";

import * as Config from "./config";

const Arck = {
    Dsl,
    Di,
    Reflection,

    Config
};

export {
    Dsl,
    Di,
    Reflection,

    Config,

    Arck
};

export default Arck;

import { makeGlobalExecutable } from "./global";
makeGlobalExecutable(Arck);