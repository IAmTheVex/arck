import {Controller, Get} from "@arck/http";

@Controller()
export class HomeController {

    @Get()
    public index() {
        return "hi!";
    }
}