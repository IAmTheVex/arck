import {Service} from "@arck/core/di";
import {LocalStorageConfig} from "../config";
import * as fs from "@arck/core/fs";

import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {LocalStorageSchema} from "./LocalStorageSchema";
import {LocalStorageCommitChain} from "./LocalStorageCommitChain";

@Service()
export class LocalStorageContainer {
    public db: low.LowdbSync<LocalStorageSchema>;

    public constructor(
        private localStorageConfig: LocalStorageConfig
    ) {
        let shouldInit = !fs.extra.existsSync(localStorageConfig.path);
        if(shouldInit) {
            fs.extra.ensureFileSync(localStorageConfig.path);
        }

        this.db = low(new FileSync(localStorageConfig.path));

        if(shouldInit) {
            this.db.defaults({ items: { } }).write();
        }
    }

    public getItem<T = any>(key: string): T {
       return this.db.get(`items.${key}`).value() as T;
    }

    public getAll(): { [key: string]: any } {
        return this.db.get("items").value();
    }

    public setItem<T = any>(key: string, value: T): LocalStorageCommitChain {
        return new LocalStorageCommitChain(this.db).setItem<T>(key, value);
    }

    public deleteItem(key: string): LocalStorageCommitChain {
        return this.setItem(key, undefined);
    }

    public hasItem(key: string): boolean {
        return this.db.has(`items.${key}`).value();
    }

    public clearAll(): LocalStorageCommitChain {
        return new LocalStorageCommitChain(this.db).clearAll();
    }
}