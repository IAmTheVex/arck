import * as fs from "fs";
import * as path from "path";
import {LoaderPathProvider, LoaderPathProviderError} from "./LoaderPathProvider";

export class ProjectPathProvider extends LoaderPathProvider {
    private cache: string | undefined;

    private projectFileName: string = "arck.tsx";

    private projectFileNameForDirectory(dir: string): string {
        return path.join(dir, this.projectFileName);
    }

    private locateProjectPath(): string | undefined {
        let currentDirectory = process.cwd();
        let currentFile = this.projectFileNameForDirectory(currentDirectory);
        while (currentDirectory != "/") {
            if (fs.existsSync(currentFile)) break;
            currentDirectory = path.join(currentDirectory, "..");
            currentFile = this.projectFileNameForDirectory(currentDirectory);
        }
        return fs.existsSync(currentFile) ? currentDirectory : undefined;
    }

    public providePath(requestedPath: string): string {
        let p = this.inspectPath(requestedPath);

        if(!fs.existsSync(p)) {
            throw new LoaderPathProviderError(`Could not locate '${requestedPath}' in the current project!\nFull lookup path: '${p}'.`);
        }

        return p;
    }

    public inspectPath(requestedPath: string): string {
        if(!this.cache) {
            this.cache = this.locateProjectPath();
            if(!this.cache) {
                throw new LoaderPathProviderError("Could not locate a valid project in the current directory tree!");
            }
        }

        return path.join(this.cache!, requestedPath);
    }
}