import "@arck/core";

import {Configuration} from "@arck/core/config";

import {
    Runtime,
    RunnableShellList,
    RunnableShellItem,
    Build,
    Project,
    BuildGroup,
    BuildItem,
    BuildGroupList
} from "@arck/architect/config";

import {LocalStorage} from "@arck/storage/config";

import {Prisma} from "@arck/prisma/config";
import {PrismaClient} from "@prisma/client";

import {Http} from "@arck/http/config";

import {SimpleRunnableShell} from "./src/shells/SimpleRunnableShell";
import {Simple2RunnableShell} from "./src/shells/Simple2RunnableShell";
import {TestBuildShell1, TestBuildShell2} from "./src/shells/build/TestBuildShell";

import {SimpleLoggerModule} from "./src/modules/SimpleLoggerModule";
import {HomeController} from "./src/controllers/HomeController";
import {SimpleLoggerMiddleware} from "./src/middleware/SimpleLoggerMiddleware";

export default (
    <Configuration>
        <LocalStorage />

        <Prisma rootFolderName="db" provider={() => new PrismaClient()}/>

        <Http
            cors development
            listen={{ httpPort: 4400 }}
            modules={[ SimpleLoggerModule ]}
            controllers={[ HomeController ]}
            middlewares={[ SimpleLoggerMiddleware ]}
        />

        <Build>
            <Project configFileName="tsconfig.json" includeFileFromConfigFiles={false} buildCache={true} />

            <BuildGroupList>
                <BuildGroup default>
                    <BuildItem shell={TestBuildShell1} />
                    <BuildItem shell={TestBuildShell2} name ="Test2"/>
                </BuildGroup>

                <BuildGroup name="OnlyTest1">
                    <BuildItem shell={TestBuildShell1} />
                </BuildGroup>
            </BuildGroupList>
        </Build>

        <Runtime>
            <RunnableShellList>
                <RunnableShellItem shell={SimpleRunnableShell} />
                <RunnableShellItem shell={Simple2RunnableShell} name="Simple2" />
            </RunnableShellList>
        </Runtime>

    </Configuration>
);