export type SortKey = keyof Sort;
export class  Sort {
    name: number = 0;
    partNumber: number = 0;
    price: number = 0
    firstName: number = 0;
    lastName: number = 0;
    email: number = 0;
    sortBy: SortKey = "name";
    

    getSortSymbol(sortKey: SortKey): string {
        const sortValue = this[sortKey];
        return sortValue === 1? "▲" : (sortValue === -1 ? "▼": "");
    }

    setSortBy(sortBy: SortKey) {        
        let temp: number = 0;
        switch(sortBy) {
          case 'name':
            temp = this['name'];
            this.clear();
            this.sortBy = sortBy;
            this['name'] = temp;
            this['name'] = this.getNextSort();
            break;
          case 'partNumber':
            temp = this['partNumber'];
            this.clear();
            this.sortBy = sortBy;
            this['partNumber'] = temp;
            this['partNumber'] = this.getNextSort();
            break;
          case 'price':
            temp = this['price'];
            this.clear();
            this.sortBy = sortBy;
            this['price'] = temp;
            this['price'] = this.getNextSort();
            break;
        case 'firstName':
            temp = this['firstName'];
            this.clear();
            this.sortBy = sortBy;
            this['firstName'] = temp;
            this['firstName'] = this.getNextSort();
            break;
        case 'lastName':
            temp = this['lastName'];
            this.clear();
            this.sortBy = sortBy;
            this['lastName'] = temp;
            this['lastName'] = this.getNextSort();
            break;
        case 'email':
            temp = this['email'];
            this.clear();
            this.sortBy = sortBy;
            this['email'] = temp;
            this['email'] = this.getNextSort();
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
        return this.name !== 0 || this.partNumber !== 0 || this.price !== 0
                || this.firstName !== 0 || this.lastName !== 0 || this.email !==0;
    }

    clear(): void {
        this.name = 0;
        this.partNumber = 0;
        this.price = 0;
        this.firstName = 0;
        this.lastName = 0;
        this.email = 0
        this.sortBy  = "name";
    }
}