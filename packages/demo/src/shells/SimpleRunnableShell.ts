import {Inject} from "@arck/core/di";
import {RunnableShell, Shell} from "@arck/architect/shell";
import {LocalStorageContainer} from "@arck/storage/local";

@Shell()
export class SimpleRunnableShell extends RunnableShell {
    @Inject()
    private localStorage: LocalStorageContainer;

    public async run() {
        let a = 30;

        console.log("hello there!", a);

        if(!this.localStorage.hasItem("caca")) {
            this.localStorage
                .setItem("aaaa", "123" + Date.now())
                .setItem("bbbb", "123")
                .commit();
        }

        console.log(this.localStorage.getAll());

        this.localStorage.deleteItem("aaaa").commit();
    }
}