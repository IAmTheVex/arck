import { rule } from "@arck/http/graphql/permissions";
import {Context} from "../../../Context";

export const isAuthenticated = rule({ cache: "contextual" })(
    async (parent, args, ctx: Context, info) => {
        return !!ctx.user;
    }
);