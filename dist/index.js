"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncArray = void 0;
class AsyncArray extends Array {
    constructor(...args) {
        if (Array.isArray(args[0])) {
            super(...args[0]);
        }
        else {
            super(...args);
        }
    }
    asyncForEach(predicate) {
        return new Promise((resolve) => {
            const loop = async (i) => {
                if (i >= this.length) {
                    resolve(undefined);
                    return;
                }
                await predicate(this[i], i);
                loop(i + 1);
            };
            loop(0);
        });
    }
    forEachCompleted(predicate) {
        return new Promise((resolve) => {
            if (this.length === 0) {
                resolve(undefined);
                return;
            }
            let passed = 0;
            const loop = async (i) => {
                if (i >= this.length) {
                    return;
                }
                loop(i + 1);
                await predicate(this[i], i);
                passed++;
                if (passed === this.length) {
                    resolve(undefined);
                }
            };
            loop(0);
        });
    }
    asyncFilter(predicate) {
        return new Promise((resolve) => {
            const array = [];
            const loop = async (i) => {
                if (i >= this.length) {
                    return resolve(array);
                }
                const result = await predicate(this[i], i);
                if (result) {
                    array.push(this[i]);
                }
                loop(i + 1);
            };
            loop(0);
        });
    }
    asyncMap(predicate) {
        return new Promise((resolve) => {
            const array = [];
            const loop = async (i) => {
                if (i >= this.length) {
                    return resolve(array);
                }
                const result = await predicate(this[i], i);
                if (result) {
                    array.push(result);
                }
                loop(i + 1);
            };
            loop(0);
        });
    }
}
exports.AsyncArray = AsyncArray;
//# sourceMappingURL=index.js.map