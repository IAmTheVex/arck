import {Service} from "@arck/core/di";
import {PermissionsProvider} from "@arck/http/graphql/provider";
import {shield, allow, deny} from "@arck/http/graphql/permissions";
import {GraphError} from "@arck/http/graphql/errors";

@Service()
export class DefaultPermissionsProvider implements PermissionsProvider {
    public buildPermissions() {
        return shield({
            Query: {
                '*': deny,
                me: allow
            }
        },
        {
            fallbackError: new GraphError("f u hacker!")
        });
    }
}