export type ElementEventListener<T> = (data: T) => Promise<void>;
export type ElementEventListenersArray<T> = ((data: T) => Promise<void>)[];
