class AsyncArray extends Array {
	constructor() {
		if (Array.isArray(arguments[0])) {
			super(...arguments[0]);
		} else {
			super(...arguments);
		}
	}

	asyncForEach(predicate: Function): Promise<undefined> {
		return new Promise((resolve) => {
			const loop = async (i: number) => {
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

	forEachCompleted(predicate: Function): Promise<undefined> {
		return new Promise((resolve) => {
			let passed = 0;
			const loop = async (i: number) => {
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

	asyncFilter(predicate: Function): Promise<any[]> {
		return new Promise((resolve) => {
			const array: any[] = [];
			const loop = async (i: number) => {
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

	asyncMap(predicate: Function): Promise<any[]> {
		return new Promise((resolve) => {
			const array: any[] = [];
			const loop = async (i: number) => {
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

module.exports = {AsyncArray};