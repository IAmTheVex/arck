declare global {
    namespace NodeJS {
        export interface Global {
            _arck: any;
        }
    }
}

export function makeGlobalExecutable(Arck: any) {
    global._arck = Arck;
}