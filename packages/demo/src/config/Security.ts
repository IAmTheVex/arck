import {ConfigItem, ConfigItemProperties, ConfigRegistry, ConfigItemWrapper} from "@arck/core/config";

export type SecurityChildren = undefined;


export interface SecurityProperties extends ConfigItemProperties<SecurityChildren> {
    jwt: {
        secret: string;
        expiresIn: string;
    };
}

export class Security extends ConfigItem<SecurityProperties> { }

export class SecurityConfig extends ConfigItemWrapper<Security> {

    public settings: SecurityProperties;

    constructor(tag: Security) {
        if(!tag || !tag.properties) {
            throw new Error("No Security configuration was found!")
        }

        super(tag);

        this.settings = tag.properties;
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(Security, SecurityConfig);