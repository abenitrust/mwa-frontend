import { CompatibleModels } from './compatible-models';

export class Part {
    _id: string;
    name: string;
    partNumber: string;
    price: string;
    category: string;
    brand: string;
    #compatibleModels: CompatibleModels[] = [];

    constructor(
        _id: string = "", name: string = "",
        partNumber: string = "", price: string = "",
        category: string = "", brand: string = ""
    ) {
        this._id = _id;
        this.name = name;
        this.partNumber = partNumber;
        this.price = price;
        this.category = category;
        this.brand = brand;
    }

    set compatibleModels(compatibleModels: CompatibleModels[]) {
        const cModels: CompatibleModels[] = []
        compatibleModels.forEach(cModel => {
            cModels.push(
                new CompatibleModels(
                    cModel._id,
                    cModel.make,
                    cModel.model,
                    cModel.body,
                    cModel.year
                )
            )
            this.#compatibleModels = cModels;
        })
    }

    get compatibleModels(): CompatibleModels[] {
        return this.#compatibleModels;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            partNumber: this.partNumber,
            brand: this.brand,
            category: this.category,
            price: this.price,
            compatibleModels: this.compatibleModels
        }
    }
}

export class PartsData {
    page: number = 0;
    perPage: number = 0;
    totalCount: number = 0;
    data: Part[] = [];
}

export class PartData {
    page: number = 0;
    perPage: number = 0;
    totalCount: number = 0;
    data: Part = new Part();
}