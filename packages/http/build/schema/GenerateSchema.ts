import {BuildShell} from "@arck/architect/build";
import {Shell} from "@arck/architect/shell";
import {SchemaBuilder} from "../../graphql/schema";

@Shell()
export class GenerateSchema extends BuildShell {
    constructor(
        private schemaBuilder: SchemaBuilder
    ) {
        super();
    }

    async build() {
        await this.schemaBuilder.staticSchema();
    }
}
