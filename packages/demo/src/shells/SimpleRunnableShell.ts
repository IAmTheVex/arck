import {Inject} from "@arck/core/di";
import {RunnableShell, Shell} from "@arck/architect/shell";
import {LocalStorageContainer} from "@arck/storage/local";
import {Project, CodeGenerator, ProjectCache} from "@arck/architect/build";
import {DMMFProcessor} from "@arck/prisma/reflection";
import {Data, DataClient} from "@arck/prisma/data";
import {HttpServer} from "@arck/http/server";
import {SchemaBuilder} from "@arck/http/graphql/schema";
import {ApolloServerBuilder} from "@arck/http/graphql/apollo";

@Shell()
export class SimpleRunnableShell extends RunnableShell {
    @Inject()
    private localStorage: LocalStorageContainer;

    @Inject()
    private buildProject: Project;

    @Inject()
    private buildCache: ProjectCache;

    @Inject()
    private codeGenerator: CodeGenerator;

    @Inject()
    private dmmfProcessor: DMMFProcessor;

    @Data()
    private data: DataClient;

    @Inject()
    private server: HttpServer;

    @Inject()
    private schemaBuilder: SchemaBuilder;

    @Inject()
    private apolloBuilder: ApolloServerBuilder;

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

        // console.log(this.buildProject.compiler.getSourceFiles().map(x => x.getBaseName()));

        // let dmmf = this.dmmfProcessor.getFromClient();
        // console.log(dmmf.datamodel.models.map(x => x.fields));

        // await this.data.client.connect();
        // await this.data.user.create({
        //     data: {
        //         email: "laurentiu@thevexis.me",
        //         name: "laurentiu ciobanu",
        //         profiles: {
        //             create: {
        //                 bio: "simple profile"
        //             }
        //         }
        //     }
        // });

        // await this.data.profile.create({ data: {
        //         bio: "this is a second simple profile",
        //         user: {
        //             connect: {
        //                 email: "laurentiu@thevexis.me"
        //             }
        //         }
        //     }});
        // console.log(await this.data.user.count());
        // await this.data.disconnect();

        // console.log(await this.apolloBuilder.build());

        await this.server.listen();

        // await this.schemaBuilder.build();

        // this.buildCache.classes.invalidate("GeneratedClazz");
        //
        // let source = this.codeGenerator.getCleanGeneratedFile("generated/clazz.ts");
        // source.replaceWithText("export class GeneratedClazz { }; ");
        // await source.save();
        //
        // console.log(this.buildCache.classes.getOne("GeneratedClazz")?.getSourceFile().getBaseName());

        return "Ready!";
    }
}