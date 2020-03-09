import {Controller, Get, CurrentUser, Param} from "@arck/http";
import {User} from "@prisma/client";
import {TokenService} from "../services/auth/TokenService";


@Controller()
export class HomeController {

    constructor(
        private tokenService: TokenService
    ) {
    }

    @Get("/token/:uid")
    public tokenForUser(
        @Param("uid") userId: string
    ) {
        return this.tokenService.generateToken({ userId });
    }

    @Get()
    public index(
        @CurrentUser() user?: User
    ) {
        if(user) {
            console.log(user.user_id, user.email, user.name);
        } else {
            console.log("no user :(");
        }
        return "hi!";
    }
}