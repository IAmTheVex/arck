import { IConfigInput } from "./IConfigInput";
import { AbstractConfigType } from "./AbstractConfigType";

export interface DataSourceInput extends IConfigInput {
  name?: string;
}

export class DataSource extends AbstractConfigType<DataSourceInput> {
  constructor(public input: DataSourceInput) {
    super(input);

    this.input.name = input.name ?? "default";
  }
}
