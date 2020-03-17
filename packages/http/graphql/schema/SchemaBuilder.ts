import Container, {Service} from "@arck/core/di";
import {SchemaConfig} from "../../config";
import {makeSchema, connectionPlugin} from "../nexus";
import {nexusPrismaPlugin} from "../prisma";
import {TypesProvider} from "../provider";
import {LoaderPathProviders} from "@arck/core/reflection";
import {applyMiddleware} from "graphql-middleware";
import {NexusGraphQLSchema} from "nexus/dist/definitions/_types";

@Service()
export class SchemaBuilder {
    private _schema?: NexusGraphQLSchema;
    private _runnableSchema?: NexusGraphQLSchema;

    constructor(
        private config: SchemaConfig,
    ) {
    }

    private async getBaseSchema() {
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

        return schema;
    }

    public async runnableSchema() {
        if(!this._runnableSchema) {
            let schema = await this.getBaseSchema();

            // should apply permissions
            if (!!this.config.settings.permissions) {
                let provider = Container.get(this.config.settings.permissions);
                if (!!provider) {
                    applyMiddleware(schema, provider.buildPermissions());
                }
            }

            this._runnableSchema = schema;
        }

        return this._runnableSchema;
    }

    public async staticSchema() {
        if(!this._schema) {
            let schema = await this.getBaseSchema();
            applyMiddleware(schema);
            this._schema = schema;
        }

        return this._schema;
    }
}
