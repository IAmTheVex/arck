import {Service} from "@arck/core/di";
import * as compiler from "ts-morph";
import {tsquery as query} from "@phenomnomnominal/tsquery";
import {LoaderPathProviders} from "@arck/core/reflection";
import {ProjectConfig} from "../config";

export { compiler };

@Service()
export class Project {

    private readonly _project: compiler.Project;
    private readonly _configFilePath: string;

    constructor(
        private buildProjectConfig: ProjectConfig
    ) {
        this._configFilePath = LoaderPathProviders.ProjectPath.providePath(buildProjectConfig.configFileName);
        this._project = new compiler.Project({
            tsConfigFilePath: this._configFilePath,
            addFilesFromTsConfig: buildProjectConfig.includeFileFromConfigFiles
        });
    }

    public get compiler() {
        return this._project;
    }

    public query<T extends compiler.Node = compiler.Node>(node: compiler.Node, q: string): T[] { 
        // https://gist.github.com/dsherret/826fe77613be22676778b8c4ba7390e7 
        return query(node.compilerNode as any, q) 
            .map(n => ((node as any)._getNodeFromCompilerNode(n) as T));
    }

    public queryOne<T extends compiler.Node = compiler.Node>(node: compiler.Node, q: string): T | undefined {
        let results = this.query<T>(node, q);
        return results.length ? results[0] : undefined;
    }
}