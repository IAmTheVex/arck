import * as path from "path";
import * as fs from "fs";

import { Service } from "../di";
import { Config } from "./types/Config";

@Service()
export class ConfigLoader {
  private _configsCache: Config | undefined;

  private _confFileName: string = "arck.conf.tsx";
  private configFileNameForDirectory(dir: string): string {
    return path.join(dir, this._confFileName);
  }

  private currentConfigFileName: string | undefined = "";

  private locateConfigPath(): string | undefined {
    let currentDirectory = process.cwd();
    let currentFile = this.configFileNameForDirectory(currentDirectory);
    while (currentDirectory != "/") {
      if (fs.existsSync(currentFile)) break;
      currentDirectory = path.join(currentDirectory, "..");
      currentFile = this.configFileNameForDirectory(currentDirectory);
    }
    return fs.existsSync(currentFile) ? currentFile : undefined;
  }

  private safeConfigPath(pth: string | undefined): asserts pth is string {
    if (!!path && fs.existsSync(pth!)) return;

    throw new Error(`Could not locate config file '${this._confFileName}'!`);
  }

  private safeArrayImportResult(imp: any): asserts imp is Config {
    if (!!imp && imp instanceof Config) return;

    throw new Error(`Config file '${this._confFileName}' doesn't have a valid 'default' export!`);
  }

  private loadCurrentConfigFile(): Config {
    this.safeConfigPath(this.currentConfigFileName);
    let imp = require(this.currentConfigFileName);

    if (!imp || !imp.default) throw new Error(`Config file '${this._confFileName}' doesn't have a valid 'default' export!`);
    this.safeArrayImportResult(imp.default);

    return imp.default;
  }

  public load(): Config {
    if (!this._configsCache) {
      this.currentConfigFileName = this.locateConfigPath();
      this._configsCache = this.loadCurrentConfigFile();
    }

    return this._configsCache;
  }
}