import {Service} from "@arck/core/di";
import {TypesProvider} from "@arck/http/graphql/provider"
import {objectType, mutationType, queryType} from "@arck/http/graphql/nexus";
import {Data, DataClient} from "@arck/prisma/data";

@Service()
export class UserTypeProvider implements TypesProvider {

    @Data()
    private data: DataClient;

    buildTypes() {
        return [
            this.post,
            ...this.userCruds,
            this.user
        ];
    }

    userCruds = [
        mutationType({
            definition: (t) => {
                t.crud.createOneUser();
                t.crud.createOnePost();
            }
        }),
        queryType({
            definition(t) {
                t.crud.user();
                t.crud.users();

                t.field("me", {
                    type: "User",
                    nullable: true,
                    resolve: async (_, args, ctx, info) => {
                        return ctx.user ?? null;
                    }
                });
            }
        })
    ];

    user = objectType({
        name: "User",
        definition: (t) => {
            t.model.user_id();
            t.model.name();
            t.model.posts();
            t.connection("postsConnection", {
                type: this.post,
                nodes: (root, args, ctx, info) => {
                    return this.data.post.findMany({ where: { author: { user_id: root.user_id }}});
                }
            })
        }
    });

    post = objectType({
        name: "Post",
        definition: (t) => {
            t.model.post_id();
            t.model.author();
            t.model.title();
        }
    });
}