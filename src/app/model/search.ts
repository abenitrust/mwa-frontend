export class Search {
    text: string;
    constructor(text: string ="") {
        this.text = text;
    }

    clear() {
        this.text = "";
    }

    getQuery() {
        return `search=${this.text}`;
    }
}