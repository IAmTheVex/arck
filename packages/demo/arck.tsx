import "@arck/core";

import {Configuration} from "@arck/core/config";
import {RunnableShellList, RunnableShellItem} from "@arck/architect/config";

import {LocalStorage} from "@arck/storage/config";

import {SimpleRunnableShell} from "./src/shells/SimpleRunnableShell";
import {Simple2RunnableShell} from "./src/shells/Simple2RunnableShell";

export default <Configuration name="test">
    <LocalStorage />

    <RunnableShellList>
        <RunnableShellItem shell={SimpleRunnableShell} />
        <RunnableShellItem shell={Simple2RunnableShell} name="Simple2" />
    </RunnableShellList>
</Configuration>