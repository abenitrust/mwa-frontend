export class CompatibleModels {
    #csvSeparator = ",";
    _id: string;
    make: string;
    model: string[];
    body: string[];
    year: string[];

    constructor(_id: string = "", make: string = "", model: string[] = [], body: string[] = [], year: string[] = []) {
        this._id = _id;
        this.make = make;
        this.model = model;
        this.body = body;
        this.year = year;
    }

    get modelCSV(): string {
        return this.model.join(this.#csvSeparator);
    }

    get bodyCSV(): string {
        return this.body.join(this.#csvSeparator);
    }

    get yearCSV(): string {
        return this.year.join(this.#csvSeparator);
    }

    set modelCSV(modelCSV: string) {
        this.model = modelCSV.split(this.#csvSeparator);
    }

    set bodyCSV(bodyCSV: string) {
        this.body = bodyCSV.split(this.#csvSeparator);
    }

    set yearCSV(yearCSV: string) {
        this.year = yearCSV.split(this.#csvSeparator);
    }

    toJSON() {
        return {
            _id: this._id === "" ? null : this._id,
            make: this.make,
            model: this.model,
            body: this.body,
            year: this.year,
        }
    }
}