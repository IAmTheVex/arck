import {Service} from "@arck/core/di";
import {Project, compiler} from "./Project";

@Service()
export class CodeGenerator {

    constructor(
        private buildProject: Project
    ) {
    }

    public getCleanGeneratedFile(filename: string): compiler.SourceFile {
        try {
            this.buildProject.compiler.addSourceFileAtPathIfExists(filename);

            let generatedFile = this.buildProject.compiler.getSourceFileOrThrow(filename);
            generatedFile.deleteImmediatelySync();
        } catch(ex) { }
        return this.buildProject.compiler.createSourceFile(filename);
    }

}