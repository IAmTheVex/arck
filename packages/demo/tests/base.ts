import "reflect-metadata";
import "@arck/test/setup";

import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import Container from "@arck/core/di";

import {CodeLoader} from "@arck/core/reflection";
import {DslParser} from "@arck/core/dsl";
import {Configuration} from "@arck/core/config";

chai.use(sinonChai);

export abstract class DefaultTestFixture {
    protected codeLoader: CodeLoader = Container.get(CodeLoader);
    protected dslParser = Container.get(DslParser);
    protected configuration: Configuration;

    before () {
        this.configuration = this.codeLoader.prepare("arck.tsx").load<Configuration>();
        this.dslParser.parse(this.configuration);
    }
}

chai.should();
const { expect, assert } = chai;

const { spy } = sinon;

export { chai, expect, assert, sinon, sinonChai, spy };
