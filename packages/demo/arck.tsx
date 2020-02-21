import "@arck/core";

import {Configuration} from "@arck/core/config";
import {RunnableShellList, RunnableShellItem, Build, Project} from "@arck/architect/config";
import {LocalStorage} from "@arck/storage/config";

import {SimpleRunnableShell} from "./src/shells/SimpleRunnableShell";
import {Simple2RunnableShell} from "./src/shells/Simple2RunnableShell";

export default (
    <Configuration name="test">
        <LocalStorage />

        <Build>
            <Project configFileName="tsconfig.json" includeFileFromConfigFiles={true} buildCache={true} />
        </Build>

        <RunnableShellList>
            <RunnableShellItem shell={SimpleRunnableShell} />
            <RunnableShellItem shell={Simple2RunnableShell} name="Simple2" />
        </RunnableShellList>
    </Configuration>
);