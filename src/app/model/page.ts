export class Page {
    start: number;
    count: number;
    totalCount: number;

    constructor(start: number = 1, count: number = 5, totalCount: number = 1) {
        this.start = start;
        this.count = count;
        this.totalCount = totalCount;
    }

    getQuery(): string {
        return `start=${this.start}&count=${this.count}`;
    }

    clear(): void {
        this.start  = 1;
        this.count = 5;
    }
}