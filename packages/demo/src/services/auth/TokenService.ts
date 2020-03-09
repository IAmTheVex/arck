import {Service, Inject} from "@arck/core/di";
import {bcrypt, jwt} from "@arck/crypto/engine";
import {express} from "@arck/http/express";
import {DecodedToken} from "./DecodedToken";
import {SecurityConfig} from "../../config/Security";

@Service()
export class TokenService {

    @Inject()
    public config: SecurityConfig;

    public validateToken(token: string): DecodedToken | undefined {
        let tok: DecodedToken | undefined = undefined;

        try {
            tok = jwt.verify(token, this.config.settings.jwt.secret) as DecodedToken;
        } catch (error) {}

        return tok;
    }

    public generateToken(payload: { userId: string }): string {
        return jwt.sign(payload, this.config.settings.jwt.secret, { expiresIn: this.config.settings.jwt.expiresIn });
    }

    public getTokenFromRequest(request: express.Request): string {
        function getCookieFromRequest(cookieKey: string) {
            try {
                const cookie = request.cookies[cookieKey];
                const signedCookie = request.signedCookies[cookieKey];
                if (cookie) return cookie;
                if (signedCookie) return signedCookie;
                return "";
            } catch (error) {
                return "";
            }
        }

        try {
            let token = request.headers["authorization"] || "";
            if (!token) token = getCookieFromRequest("token") || "";
            return token;
        } catch (error) {
            return '';
        }
    }
}