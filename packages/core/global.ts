declare global {
    namespace NodeJS {
        export interface Global {
            _arck: any;
        }
    }
}

export function makeGlobalExecutable(Arck: any) {
    if(!global._arck) global._arck = Arck;
}