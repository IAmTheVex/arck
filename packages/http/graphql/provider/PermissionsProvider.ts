import {IMiddlewareGenerator} from "graphql-middleware";

export interface PermissionsProvider {
    buildPermissions(): any | Promise<any>;
}