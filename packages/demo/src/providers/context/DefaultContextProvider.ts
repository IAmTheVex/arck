import {Service, Inject} from "@arck/core/di";
import {ContextProvider} from "@arck/http/graphql/provider";
import {Data, DataClient} from "@arck/prisma/data";
import {express} from "@arck/http/express";
import {ExecutionParams} from "@arck/http/graphql/subscription/engine";
import {Context} from "../../Context";
import {TokenService} from "../../services/auth/TokenService";
import {User} from "@prisma/client";
import { PubSub } from "@arck/http/graphql/subscription";

@Service()
export class DefaultContextProvider implements ContextProvider<Context> {
    @Data()
    private data: DataClient;

    @Inject()
    private tokenService: TokenService;

    private pubSub = new PubSub();

    async buildContext(request: express.Request, response: express.Response, subscription: { connection?: ExecutionParams<Context>; payload?: any }): Promise<Context> {
        let ctx: Context = {
            http: {
                request,
                response
            },
            subscription,
            data: this.data,
            prisma: this.data,
            pubSub: this.pubSub
        };

        if(!!subscription.connection?.context) {
            ctx.userId = subscription.connection.context.userId;
            ctx.user = subscription.connection.context.user;

            return ctx;
        }

        if(subscription.connection && subscription.payload?.authorization) {
            const decodedToken = this.tokenService.validateToken(subscription.payload.autorization);
            if(decodedToken) {
                ctx.userId = decodedToken.userId;
                ctx.user = await this.data.user.findOne({ where: { user_id: ctx.userId }}) ?? undefined;
            }

            return ctx;
        }

        if(!!(request as any).user) {
            let user = (request as any).user as User;

            ctx.user = user;
            ctx.userId = user.user_id;
        }

        return ctx;
    }

    async fillSubscriptionContext(connectionParams?: any, webSocket?: any): Promise<Partial<Context>> {
        if (connectionParams?.authorization) {
            const decodedToken = this.tokenService.validateToken(connectionParams.authorization);
            if (decodedToken) {
                const userId = decodedToken.userId;
                const user = await this.data.user.findOne({ where: { user_id: userId } }) ?? undefined;
                return { userId, user };
            }
        }
        if (webSocket?.upgradeReq) {
            const token = this.tokenService.getTokenFromRequest(webSocket.upgradeReq);
            if (token) {
                const decodedToken = this.tokenService.validateToken(token);
                if (decodedToken) {
                    const userId = decodedToken.userId;
                    const user = await this.data.user.findOne({ where: { user_id: userId } }) ?? undefined;
                    return { userId, user };
                }
            }
        }
        return {};
    }
}