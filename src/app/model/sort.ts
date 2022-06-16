export type SortKey = keyof Sort;
export class  Sort {
    name: number = 0;
    partNumber: number = 0;
    price: number = 0
    sortBy: SortKey = "name";
    

    getSortSymbol(sortKey: SortKey): string {
        const sortValue = this[sortKey];
        return sortValue === 1? "▲" : (sortValue === -1 ? "▼": "");
    }

    setSortBy(sortBy: SortKey) {
        this.sortBy = sortBy;
        switch(sortBy) {
          case 'name':
            this['name'] = this.getNextSort();
            this['partNumber'] = 0;
            this['price'] = 0;
            break;
          case 'partNumber':
            this['name'] = 0;
            this['partNumber'] = this.getNextSort();
            this['price'] = 0;
            break;
          case 'price':
            this['name'] = 0;
            this['partNumber'] = 0;
            this['price'] = this.getNextSort();
            break;
        }
    }

    getNextSort(): number {
        let nextSortOrder = 0;
        const currentSortValue = this[this.sortBy];
        if(currentSortValue === 0) {
            nextSortOrder = 1;
        } else if(currentSortValue === 1) {
            nextSortOrder = -1;
        } else {
            nextSortOrder = 0;
        }
        return nextSortOrder;
    }

    getQuery(): string {
        return `sort_${this.sortBy}=${this[this.sortBy]}`
    }

    sortExists(): boolean {
        return this.name !== 0 || this.partNumber !== 0 || this.price !== 0;
    }

    clear(): void {
        this.name = 0;
        this.partNumber = 0;
        this.price = 0
        this.sortBy  = "name";
    }
}