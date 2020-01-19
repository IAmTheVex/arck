export abstract class LoaderPathProvider {

    public abstract providePath(requestedPath: string): string;

}

export class LoaderPathProviderError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "LoaderPathProviderError";
    }
}