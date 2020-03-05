import {ConfigItem, ConfigItemProperties, ConfigRegistry, ConfigItemWrapper} from "@arck/core/config";
import {Schema} from "./Schema";

export type GraphQLChildren = (Schema)[];

export interface GraphQLProperties extends ConfigItemProperties<GraphQLChildren> {
}

export class GraphQL extends ConfigItem<GraphQLProperties> { }

export class GraphQLConfig extends ConfigItemWrapper<GraphQL> {

    public settings: GraphQLProperties;

    constructor(tag: GraphQL) {
        if(!tag || !tag.properties) {
            throw new Error("No GraphQL configuration was found!")
        }

        super(tag);

        this.settings = tag.properties;
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(GraphQL, GraphQLConfig);