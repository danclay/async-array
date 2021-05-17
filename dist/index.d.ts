declare class AsyncArray extends Array {
    constructor(...args: any[]);
    asyncForEach(predicate: Function): Promise<undefined>;
    forEachCompleted(predicate: Function): Promise<undefined>;
    asyncFilter(predicate: Function): Promise<any[]>;
    asyncMap(predicate: Function): Promise<any[]>;
}
export { AsyncArray };
