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
import {LoaderPathProviders} from "@arck/core/reflection";

import {LocalStorage} from "@arck/storage/config";

import {Prisma} from "@arck/prisma/config";
import {PrismaClient} from "@prisma/client";

import {Http, GraphQL, Schema} from "@arck/http/config";

import {SimpleRunnableShell} from "./src/shells/SimpleRunnableShell";
import {Simple2RunnableShell} from "./src/shells/Simple2RunnableShell";
import {TestBuildShell1, TestBuildShell2} from "./src/shells/build/TestBuildShell";

import {SimpleLoggerModule} from "./src/modules/SimpleLoggerModule";
import {HomeController} from "./src/controllers/HomeController";
import {SimpleLoggerMiddleware} from "./src/middleware/SimpleLoggerMiddleware";

import {UserTypeProvider} from "./src/providers/types/UserTypeProvider";
import {Context} from "./src/Context";
import {Security} from "./src/config/Security";
import {DefaultContextProvider} from "./src/providers/DefaultContextProvider";
import {ApolloServerModule} from "@arck/http/graphql/apollo";
import {AuthModule} from "./src/modules/AuthModule";

export default (
    <Configuration>
        <LocalStorage />

        <Prisma rootFolderName="db" provider={() => new PrismaClient()}/>

        <Security
            jwt={{ secret: "I_LOVE_CATS", expiresIn: "1d" }}
        />

        <Http
            cors development validation
            listen={{ httpPort: 4400 }}
            modules={[ SimpleLoggerModule, AuthModule, ApolloServerModule ]}
            controllers={[ HomeController ]}
            middlewares={[ SimpleLoggerMiddleware ]}
            currentUserChecker={(action) => {
                return (action.request as any).user;
            }}
        />

        <GraphQL>
            <Schema
                context={{
                    name: "Context",
                    path: LoaderPathProviders.ProjectPath.providePath("src/Context.ts"),
                    provider: DefaultContextProvider
                }}
                types={[ UserTypeProvider ]}
                enablePlayground
            />
        </GraphQL>

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