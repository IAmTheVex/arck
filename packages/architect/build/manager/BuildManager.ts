import {Service} from "@arck/core/di";
import {BuildGroup, BuildGroupListWrapper, BuildGroupWrapper} from "../../config";
import {Container} from "typedi";
import {BuildShell} from "../BuildShell";

@Service()
export class BuildManager {
    constructor(
        private buildGroupList: BuildGroupListWrapper
    ) {
    }

    public getBuildGroupByName(name: string): BuildGroup {
        let buildGroup = this.buildGroupList.items[name];
        if(!buildGroup) {
            throw new Error(`BuildGroup named '${name}' was not found!`)
        }

        return buildGroup;
    }

    public executeDefaultGroup() {
        if(!this.buildGroupList.default) {
            throw new EvalError("No default BuildGroup was found!");
        }

        this.executeGroup(this.buildGroupList.default);
    }

    public executeGroup(buildGroup: BuildGroup) {
        let wrapper = new BuildGroupWrapper(buildGroup);

        this.initGroup(wrapper);
        this.executePreBuildOnGroup(wrapper);
        this.executeBuildOnGroup(wrapper);
        this.executePostBuildOnGroup(wrapper);
    }

    private initGroup(wrapper: BuildGroupWrapper) {
        for(let item of wrapper.itemList) {
            Container.get(item.shell);
        }
    }

    private executePreBuildOnGroup(wrapper: BuildGroupWrapper) {
        for(let item of wrapper.itemList) {
            let shell = Container.get<BuildShell>(item.shell);
            shell.preBuild();
        }
    }

    private executeBuildOnGroup(wrapper: BuildGroupWrapper) {
        for(let item of wrapper.itemList) {
            let shell = Container.get<BuildShell>(item.shell);
            shell.build();
        }
    }

    private executePostBuildOnGroup(wrapper: BuildGroupWrapper) {
        for(let item of wrapper.itemList) {
            let shell = Container.get<BuildShell>(item.shell);
            shell.postBuild();
        }
    }

}