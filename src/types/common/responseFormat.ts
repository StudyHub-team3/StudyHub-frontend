export interface ResponseFormat<T> {
    code: string,
    message: string,
    data: T,
}

export interface Slice<T> {
    content: T[],
    first: boolean,
    last: boolean,
    size: number,
    numberOfElements: number,
    empty: boolean,
}
