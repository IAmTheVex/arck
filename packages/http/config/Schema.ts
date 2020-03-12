import {ConfigItem, ConfigItemProperties, ConfigRegistry, ConfigItemWrapper} from "@arck/core/config";
import {TypesProvider, ContextProvider, PermissionsProvider} from "../graphql/provider";
import {AnyClassConstructor} from "@arck/core/reflection";

export type SchemaChildren = undefined;

export interface SchemaProperties extends ConfigItemProperties<SchemaChildren> {
    context: {
        name: string;
        path: string;
        provider: AnyClassConstructor<ContextProvider>;
    };
    types: AnyClassConstructor<TypesProvider>[];
    permissions?: AnyClassConstructor<PermissionsProvider>
    enablePlayground?: boolean;
    enableTracing?: boolean;
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