import {BuildShell} from "@arck/architect/build";
import {Shell} from "@arck/architect/shell";

@Shell()
export class TestBuildShell1 extends BuildShell {
    async preBuild() {
        console.log("BuildShell1 preBuild()");
    }

    async build() {
        console.log("BuildShell1 build()");
    }

    async postBuild() {
        console.log("BuildShell1 postBuild()");
    }
}

@Shell()
export class TestBuildShell2 extends BuildShell {
    async preBuild() {
        console.log("BuildShell2 preBuild()");
    }

    async build() {
        console.log("BuildShell2 build()");
    }

    async postBuild() {
        console.log("BuildShell2 postBuild()");
    }
}