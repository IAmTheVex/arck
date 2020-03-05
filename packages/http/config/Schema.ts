import {ConfigItem, ConfigItemProperties, ConfigRegistry, ConfigItemWrapper} from "@arck/core/config";
import {TypesProvider} from "../graphql/provider";
import {AnyClassConstructor} from "@arck/core/reflection";
import {ContextProvider} from "../graphql/provider/ContextProvider";
import {SchemaContext} from "../graphql/schema";

export type SchemaChildren = undefined;

export interface SchemaProperties extends ConfigItemProperties<SchemaChildren> {
    context: {
        name: string;
        path: string;
        provider: AnyClassConstructor<ContextProvider>;
    };
    types: AnyClassConstructor<TypesProvider>[];
}

export class Schema extends ConfigItem<SchemaProperties> { }

export class SchemaConfig extends ConfigItemWrapper<Schema> {

    public settings: SchemaProperties;

    constructor(tag: Schema) {
        if(!tag || !tag.properties) {
            throw new Error("No Schema configuration was found!")
        }

        super(tag);

        this.settings = tag.properties;
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(Schema, SchemaConfig);