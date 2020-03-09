import {Service} from "@arck/core/di";
import {HttpServerModule} from "@arck/http/server/module";
import {HttpServer} from "@arck/http/server";
import {TokenService} from "../services/auth/TokenService";
import {Data, DataClient} from "@arck/prisma/data";

@Service()
export class AuthModule implements HttpServerModule {

    constructor(
        private tokenService: TokenService,
        @Data() private data: DataClient
    ) {
    }

    onMount(server: HttpServer): void {
        server.events.on("afterBackboneCreate", () => {
            console.log("AuthService mounted");

            server.backbone.use((req, res, next) => {
                const token = this.tokenService.getTokenFromRequest(req);
                if(!!token) {
                    let decodedToken = this.tokenService.validateToken(token);
                    if(!!decodedToken) {
                        (req as any).userId = decodedToken.userId;
                        console.log("uid", decodedToken.userId);
                    }
                }
                next();
            });

            server.backbone.use(async (req, res, next) => {
                let userId = (req as any).userId;
                if(!userId) return next();

                const user = await this.data.user.findOne({ where: { user_id: userId }});
                if(!!user) {
                    (req as any).user = user;
                }
                next();
            });
        });
    }
}