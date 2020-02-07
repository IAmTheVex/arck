import "@arck/core";

import {Configuration} from "@arck/core/config";
import {RunnableShellList, RunnableShellItem} from "@arck/architect/config";

import {SimpleRunnableShell} from "./src/shells/SimpleRunnableShell";
import {Simple2RunnableShell} from "./src/shells/Simple2RunnableShell";

export default <Configuration name="hello!">
    <RunnableShellList>
        <RunnableShellItem shell={SimpleRunnableShell} />
        <RunnableShellItem shell={Simple2RunnableShell} name="Simple2" />
    </RunnableShellList>
</Configuration>