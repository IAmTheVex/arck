export type VoidClassConstructor<T> = { new (): T };
export type AnyClassConstructor<T> = { new(...args: any[]): T };
export type ClassConstructor<T, Q extends any[]> = { new (...args: Q): T };