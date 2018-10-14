export enum State {
    EMPTY,
    LOADED,
    LOADING,
    ERROR
}

export interface Loadable<T, E = Error> {
    value?: T;
    error?: E;
    state: State;
}

export function empty<T>(): Loadable<T> {
    return {
        state: State.EMPTY,
    };
}

export function startLoading<T, E>(l: Loadable<T, E>): Loadable<T, E> {
    return {
        ...l,
        state: State.LOADING,
    };
}

export function loaded<T, E>(obj: T): Loadable<T, E> {
    return {
        value: obj,
        state: State.LOADED,
    };
}

export function error<T, E>(err: E): Loadable<T, E> {
    return {
        error: err,
        state: State.ERROR,
    };
}

export async function fromPromise<T, E>(promise: Promise<T>): Promise<Loadable<T, E>> {
    try {
        const value = await promise;
        return loaded(value);
    } catch (e) {
        return error(e);
    }
}