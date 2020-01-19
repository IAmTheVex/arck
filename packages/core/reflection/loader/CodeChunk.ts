export class CodeChunkLoadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CodeChunkLoadError";
    }
}

export class CodeChunk {
    constructor(public path: string) {}

    public load<T = any>(propertyName: string = "default"): T {
        try {
            let module = require(this.path);
            if(typeof module[propertyName] == 'undefined') {
                throw `The loaded code chunk's module does not contain the '${propertyName}' property!`;
            }

            return module[propertyName] as T;
        } catch(ex) {
            if(typeof ex == "string") throw new CodeChunkLoadError(`Could not load a code chunk from file: '${this.path}'!\n${ex}`);
            throw new CodeChunkLoadError(`Could not load a code chunk from file: '${this.path}'!`);
        }
    }
}