import * as low from "lowdb";

export class LocalStorageCommitChain {
    constructor(private db: low.LowdbSync<any>) { }

    public setItem<T = any>(key: string, value: T): LocalStorageCommitChain {
        return new LocalStorageCommitChain(this.db.set(`items.${key}`, value));
    }

    public clearAll(): LocalStorageCommitChain {
        return new LocalStorageCommitChain(this.db.set("items", {}));
    }

    public commit() {
        this.db.write();
    }
}