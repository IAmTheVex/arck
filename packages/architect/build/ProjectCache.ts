import {Service} from "@arck/core/di";
import {ProjectConfig} from "../config";
import {Project, compiler} from "./Project";

export class ProjectCacheChunk<T> {
    private _cache: { [name: string]: T[] } = { };

    constructor(
        private _project: compiler.Project,
        private filler: (source: compiler.SourceFile) => T[],
        private nameProvider: (el: T) => string,
        private filter: (name: string) => boolean = () => true
    ) {

    }

    public rebuild() {
        this.invalidateAll();

        let sourceFiles = this._project.getSourceFiles();
        for(let sourceFile of sourceFiles) {
            let elements = this.filler(sourceFile);
            for(let element of elements) {
                let name = this.nameProvider(element);

                if(!this.filter(name))
                    continue;

                if(!this._cache[name]) {
                    this._cache[name] = [];
                }
                this._cache[name].push(element);
            }
        }
    }

    public get(name: string): T[] {
        if(!this._cache[name]) {
            this._cache[name] = [];

            let sourceFiles = this._project.getSourceFiles();
            for(let sourceFile of sourceFiles) {
                this._cache[name].push(...this.filler(sourceFile).filter(x => this.filter(this.nameProvider(x))).filter(x => this.nameProvider(x) == name));
            }
        }

        return this._cache[name];
    }

    public getOne(name: string): T | undefined {
        return this.get(name)[0];
    }

    public invalidate(name: string) {
        delete this._cache[name];
    }

    public invalidateAll() {
        this._cache = { };
    }
}


@Service()
export class ProjectCache {


    // enums

    public namespaces: ProjectCacheChunk<compiler.NamespaceDeclaration>;
    public classes: ProjectCacheChunk<compiler.ClassDeclaration>;
    public interfaces: ProjectCacheChunk<compiler.InterfaceDeclaration>;
    public functions: ProjectCacheChunk<compiler.FunctionDeclaration>;
    public enums: ProjectCacheChunk<compiler.EnumDeclaration>;

    constructor(
        private buildProjectConfig: ProjectConfig,
        private buildProject: Project
    ) {
        this.classes = new ProjectCacheChunk<compiler.ClassDeclaration>(
            this.buildProject.compiler,
            sourceFile => sourceFile.getClasses()!,
            _class => _class.getName() ?? '',
            name => name.trim().length > 0
        );

        this.interfaces = new ProjectCacheChunk<compiler.InterfaceDeclaration>(
            this.buildProject.compiler,
            sourceFile => sourceFile.getInterfaces(),
            _interface => _interface.getName()
        );

        this.namespaces = new ProjectCacheChunk<compiler.NamespaceDeclaration>(
            this.buildProject.compiler,
            sourceFile => sourceFile.getNamespaces(),
            _namespace => _namespace.getName()
        );

        this.functions = new ProjectCacheChunk<compiler.FunctionDeclaration>(
            this.buildProject.compiler,
            sourceFile => sourceFile.getFunctions(),
            _function => _function.getName() ?? '',
            name => name.trim().length > 0
        );

        this.enums = new ProjectCacheChunk<compiler.EnumDeclaration>(
            this.buildProject.compiler,
            sourceFile => sourceFile.getEnums(),
            _enum => _enum.getName()
        );

        if(buildProjectConfig.buildCache) {
            this.rebuildAll();
        }
    }

    private rebuildAll() {
        this.classes.rebuild();
        this.interfaces.rebuild();
    }
}