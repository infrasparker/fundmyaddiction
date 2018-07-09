export class Item {
    constructor(
        public name: string,
        public description: string,
        public cost: number,
        public weight: number
    ) { }

    public key(): string {
        return this.name + ", " + this.description + ", " + this.cost + ", " + this.weight;
    }

    // public equals(item: Item): boolean {
    //     return (this.name === item.name) && (this.description === item.description) &&
    //         (this.cost === item.cost) && (this.weight === item.weight);
    // }
}