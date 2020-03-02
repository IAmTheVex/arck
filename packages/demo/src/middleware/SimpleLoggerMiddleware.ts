import {Middleware, ExpressMiddlewareInterface} from "@arck/http";
import {express} from "@arck/http/express";

@Middleware({ type: "after" })
export class SimpleLoggerMiddleware implements ExpressMiddlewareInterface {

    use(request: express.Request, response: express.Response, next: express.NextFunction): void {
        console.log(`${response.statusCode}\t${request.method}\t\t${request.url}`);

        next();
    }

}