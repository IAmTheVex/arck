import "reflect-metadata";

import * as Dsl from "./dsl";
import * as Di from "./di";
import * as Reflection from "./reflection";

const Arck = {
    Dsl,
    Di,
    Reflection
};

export {
    Dsl,
    Di,
    Reflection,

    Arck
};

export default Arck;

import { makeGlobalExecutable } from "./global";
makeGlobalExecutable(Arck);