import {ProjectPathProvider} from "./ProjectPathProvider";
import {ProjectModulePathProvider} from "./ProjectModulePathProvider";
import {GlobalModulePathProvider} from "./GlobalModulePathProvider";

export const LoaderPathProviders = {
    ProjectPath: new ProjectPathProvider(),
    ProjectModulePath: new ProjectModulePathProvider(),
    GlobalModulePath: new GlobalModulePathProvider()
};