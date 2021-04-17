declare class AsyncArray extends Array {
    constructor();
    asyncForEach(predicate: Function): Promise<undefined>;
    forEachCompleted(predicate: Function): Promise<undefined>;
    asyncFilter(predicate: Function): Promise<any[]>;
    asyncMap(predicate: Function): Promise<any[]>;
}
