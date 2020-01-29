import {ConfigItemProperties} from "./ConfigItemProperties";
import {DslTag} from "../dsl/tag";

export  class ConfigItem<PropertiesType extends ConfigItemProperties<any>> extends DslTag<PropertiesType> {

}