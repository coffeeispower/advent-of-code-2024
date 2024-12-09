export function count<T>(iterable: Iterable<T>, predicate: (item: T) => boolean): number {
	let count = 0;
	for(const item of iterable){
		if(predicate(item)){
			count++;
		}
	}
	return count;
}

export function window<T>(array: T[], size: number, callback:(items: T[]) => boolean): void {
	for(let i = 0; i + size <= array.length; i++){
		const window = array.slice(i, i + size);
		if(!callback(window)) {
			return;
		}
	}
}