export class Item {
    public readonly name: string;
    public readonly description: string;
    public readonly cost: number;
    public readonly weight: number;

    constructor(name: string, description: string, cost: number, weight: number) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.weight = weight;
    }

    public key(): string {
        let key = "";
        Object.getOwnPropertyNames(this).forEach(property => {
            key += this[property];
        });
        return key;
    }
    
    public descriptionBox(): string {
        return this.description;
    }

    public quickInfoBox(): string {
        return null;
    }
}