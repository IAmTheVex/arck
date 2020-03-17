import {JsonController, Get, Param} from "@arck/http";
import {TokenService} from "../services/auth/TokenService";

@JsonController("/api/auth")
export class AuthController {
    constructor(
        private tokenService: TokenService
    ) {
    }

    @Get("/token/:uid")
    public tokenForUser(
        @Param("uid") userId: string
    ) {
        return {
            accessToken: this.tokenService.generateToken({ userId })
        };
    }

}
