import * as fs from "fs";
import * as path from "path";
import {LoaderPathProvider, LoaderPathProviderError} from "./LoaderPathProvider";

export class ProjectModulePathProvider extends LoaderPathProvider {
    private cache: string | undefined;
    private yarnCache: string | undefined;

    private projectFileName: string = "arck.tsx";
    private moduleDirectoryName: string = "node_modules";

    private projectFileNameForDirectory(dir: string): string {
        return path.join(dir, this.projectFileName);
    }

    private moduleDirectoryNameForProjectDirectory(dir: string): string {
        return path.join(dir, this.moduleDirectoryName);
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

    private locateClosestModulesPath(projectPath: string){
        let currentDirectory = projectPath;
        let currentLookupPath = this.moduleDirectoryNameForProjectDirectory(currentDirectory);
        while (currentDirectory != "/") {
            if (fs.existsSync(currentLookupPath)) break;
            currentDirectory = path.join(currentDirectory, "..");
            currentLookupPath = this.moduleDirectoryNameForProjectDirectory(currentDirectory);
        }
        this.cache = fs.existsSync(currentLookupPath) ? currentLookupPath : undefined;

        currentLookupPath = path.join(currentLookupPath, `../../../${this.moduleDirectoryName}`);
        this.yarnCache = fs.existsSync(currentLookupPath) ? currentLookupPath : undefined;
    }

    public providePath(requestedPath: string): string {
        if(!this.cache) {
            this.cache = this.locateProjectPath();
            if(!this.cache) {
                throw new LoaderPathProviderError("Could not locate a valid project in the current directory tree!");
            }

            this.locateClosestModulesPath(this.cache!);
            if(!this.cache) {
                throw new LoaderPathProviderError("Could not locate a valid module root for the current project's directory tree!");
            }
        }

        let p = path.join(this.cache!, requestedPath);
        if(!fs.existsSync(p)) {
            if(!!this.yarnCache) {
                let yarnp = path.join(this.yarnCache!, requestedPath);
                if(!fs.existsSync(yarnp)) {
                    throw new LoaderPathProviderError(`Could not locate '${requestedPath}' in the current project!\nFull lookup path: '${p}' and '${yarnp}'.`);
                }
                return yarnp;
            }
            throw new LoaderPathProviderError(`Could not locate '${requestedPath}' in the current project!\nFull lookup path: '${p}'.`);
        }

        return p;
    }
}