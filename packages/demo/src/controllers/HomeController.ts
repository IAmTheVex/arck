import {Controller, Get, CurrentUser} from "@arck/http";
import {User} from "@prisma/client";

@Controller()
export class HomeController {

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
