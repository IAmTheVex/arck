import type TypedEventEmitter from "typed-emitter";
import {EventEmitter} from "events";

export class EventsEmitter {
    public static for<T>(): TypedEventEmitter<T> {
        return (<any>new EventEmitter()) as TypedEventEmitter<T>;
    }
}

export type {TypedEventEmitter};