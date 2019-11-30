import arck from "@arck/core";
import { Config, DataSource } from "@arck/core/config";

import { TestConfig } from "./src/TestConfig";

export default (
  <Config>
    <DataSource></DataSource>
    <TestConfig caca={123} />
  </Config>
);
