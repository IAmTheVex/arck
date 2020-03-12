import Container, {Service} from "@arck/core/di";
import {SchemaConfig} from "../../config";
import {makeSchema, connectionPlugin} from "../nexus";
import {nexusPrismaPlugin} from "../prisma";
import {TypesProvider} from "../provider";
import {LoaderPathProviders} from "@arck/core/reflection";
import {applyMiddleware} from "graphql-middleware";

@Service()
export class SchemaBuilder {
    constructor(
        private config: SchemaConfig,
    ) {
    }

    public async build(runnable: boolean = false) {
        let types: any[] = [];
        for (let typeProvider of this.config.settings.types) {
            let ts = await Container.get<TypesProvider>(typeProvider).buildTypes();
            types.push(...ts);
        }

        let schema = makeSchema({
            types,
            plugins: [
                connectionPlugin({
                    nexusFieldName: "connection"
                }),
                nexusPrismaPlugin({
                    inputs: {
                        prismaClient: LoaderPathProviders.ProjectModulePath.providePath("@prisma/client")
                    },
                    outputs: {
                        typegen: LoaderPathProviders.ProjectPath.inspectPath("src/@types/nexus-prisma.d.ts")
                    }
                })
            ],
            outputs: {
                schema: LoaderPathProviders.ProjectPath.inspectPath("src/generated/schema.graphql"),
                typegen: LoaderPathProviders.ProjectPath.inspectPath("src/@types/nexus-typegen.d.ts")
            },
            shouldGenerateArtifacts: true,
            typegenAutoConfig: {
                contextType: `ctx.${this.config.settings.context.name}`,
                sources: [
                    {
                        // source: LoaderPathProviders.ProjectModulePath.providePath("@prisma/client"),
                        source: "@prisma/client",
                        alias: "prismaClient"
                    },
                    {
                        source: this.config.settings.context.path,
                        alias: "ctx"
                    }
                ]
            },
        });
        if (runnable) {
            // should apply permissions
            if (!!this.config.settings.permissions) {
                let provider = Container.get(this.config.settings.permissions);
                if (!!provider) {
                    applyMiddleware(schema, provider.buildPermissions());
                    return schema;
                }
            }
        }

        applyMiddleware(schema);
        return schema;
    }
}