import {Service} from "@arck/core/di";
import {TypesProvider} from "@arck/http/graphql/provider"
import {objectType, mutationField, subscriptionField} from "@arck/http/graphql/nexus";
import {Data, DataClient} from "@arck/prisma/data";

@Service()
export class TestTypeProvider implements TypesProvider {

    @Data()
    private data: DataClient;

    private testType = objectType({
        name: "Test",
        definition: (t) => {
            t.string("t", { nullable: false });
        }
    });

    private subscription = subscriptionField("test", {
        type: this.testType,
        subscribe: (_, __, context) => {
            return context.pubSub.asyncIterator([ "TEST_ADDED" ]);
        },
        resolve: (payload) => {
            return payload;
        }
    });

    private mutation = mutationField("emitTest", {
        type: this.testType,
        nullable: false,
        resolve: (root, args, context) => {
            let test = {
                t: "aaaaaaa"
            };

            context.pubSub.publish("TEST_ADDED", test);

            return test;
        }
    });

    buildTypes() {
        return [
            this.testType,
            this.mutation,
            this.subscription
        ];
    }
}