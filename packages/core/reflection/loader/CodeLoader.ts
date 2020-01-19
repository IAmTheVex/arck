import {Service} from "../../di";
import {LoaderPathProvider} from "./providers/LoaderPathProvider";
import {LoaderPathProviders} from "./providers/LoaderPathProviders";
import {CodeChunk} from "./CodeChunk";

@Service()
export class CodeLoader {
    public prepare(path: string, pathProvider: LoaderPathProvider = LoaderPathProviders.ProjectPath): CodeChunk {
        return new CodeChunk(pathProvider.providePath(path));
    }
}