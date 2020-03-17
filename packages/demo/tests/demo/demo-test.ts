import {suite, test, skip} from "@arck/test";
import {expect, assert, spy, DefaultTestFixture} from "../base";

class SUT {
    private flags: any = {};

    public setFlag(flag: string, value: boolean): void {
        this.flags[flag] = value;
    }

    public getFlag(flag: string): boolean {
        return this.flags[flag] || false;
    }
}

@suite
class TestSuite extends DefaultTestFixture {
    private sut: SUT;

    before() {
        super.before();

        this.sut = new SUT();

        console.log("before test!");
    }

    @test
    assertTest() {
        console.log(this.configuration);
        assert.isOk(false);
    }

    @test
    expectTest() {
        expect(false).to.be.true;
    }

    @test
    shouldTest() {
        const val = false;

        val.should.be.ok;
    }

    @test
    spyTest() {
        spy(this.sut, "getFlag");

        this.sut.setFlag("foo", true);

        this.sut.getFlag('foo').should.be.true;
        this.sut.getFlag.should.have.been.calledWith('foo');
    }
}
