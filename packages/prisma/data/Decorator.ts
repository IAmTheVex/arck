import {Container} from "@arck/core/di";
import {DataService} from "./DataService";

export function Data() {
    return function(object: Object, propertyName: string, index?: number) {
        Container.registerHandler({ object, propertyName, index, value: containerInstance => containerInstance.get(DataService).client });
    };
}