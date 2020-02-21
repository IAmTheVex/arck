import {Inject} from "@arck/core/di";
import {RunnableShell, Shell} from "@arck/architect/shell";
import {LocalStorageContainer} from "@arck/storage/local";
import {Project} from "@arck/architect/build";
import {CodeGenerator} from "@arck/architect/build/CodeGenerator";
import {ProjectCache} from "@arck/architect/build/ProjectCache";

@Shell()
export class SimpleRunnableShell extends RunnableShell {
    @Inject()
    private localStorage: LocalStorageContainer;

    @Inject()
    private buildProject: Project;

    @Inject()
    private buildProjectCache: ProjectCache;

    @Inject()
    private codeGenerator: CodeGenerator;

    public async run() {
        // let a = 30;

        // console.log("hello there!", a);
        //
        // if(!this.localStorage.hasItem("caca")) {
        //     this.localStorage
        //         .setItem("aaaa", "123" + Date.now())
        //         .setItem("bbbb", "123")
        //         .commit();
        // }
        //
        // console.log(this.localStorage.getAll());
        //
        // this.localStorage.deleteItem("aaaa").commit();

        console.log(this.buildProject.compiler.getSourceFiles().map(x => x.getBaseName()));

        this.buildProjectCache.classes.invalidate("GeneratedClazz");

        let source = this.codeGenerator.getCleanGeneratedFile("generated/clazz.ts");
        source.replaceWithText("export class GeneratedClazz { }; ");
        await source.save();

        console.log(this.buildProjectCache.classes.getOne("GeneratedClazz")?.getSourceFile().getBaseName());
    }
}