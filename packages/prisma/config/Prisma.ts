import {ConfigItem, ConfigItemProperties, ConfigItemWrapper, ConfigRegistry} from "@arck/core/config";
import {LoaderPathProviders} from "@arck/core/reflection";
import {PrismaProvider} from "../provider";

export type PrismaChildren = undefined;

export interface PrismaProperties extends ConfigItemProperties<PrismaChildren> {
    rootFolderName?: string;
    provider: PrismaProvider;
}
export class Prisma extends ConfigItem<PrismaProperties> { }

export class PrismaConfig extends ConfigItemWrapper<Prisma> {
    public rootFolderName: string;
    public path: string;
    public provider: PrismaProvider;

    constructor(tag: Prisma) {
        if(!tag || !tag.properties) {
            throw new Error("No Prisma configuration was found!")
        }

        super(tag);

        this.rootFolderName = tag.properties.rootFolderName || "db";
        this.path = LoaderPathProviders.ProjectPath.providePath(this.rootFolderName);
        this.provider = tag.properties.provider;
    }
}

ConfigRegistry.registerDefaultConfigurationHandler(Prisma, PrismaConfig);