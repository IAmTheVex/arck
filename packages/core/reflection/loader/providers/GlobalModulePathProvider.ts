import * as fs from "fs";
import * as path from "path";
import {execSync} from "child_process";

import {LoaderPathProvider, LoaderPathProviderError} from "./LoaderPathProvider";

export class GlobalModulePathProvider extends LoaderPathProvider {

    private cache?: string;

    private getGlobalPath(): string {
        return execSync("npm root -g").toString('ascii').trim();
    }

    public providePath(requestedPath: string): string {
        if(!this.cache) {
            this.cache = this.getGlobalPath();
        }

        let p = path.join(this.cache!, requestedPath);
        if(!fs.existsSync(p)) {
            throw new LoaderPathProviderError(`Could not locate '${requestedPath}' in the current project!\nFull lookup path: '${p}'.`);
        }

        return p;
    }

}
