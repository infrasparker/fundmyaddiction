export class Dice {
    public amount: number;
    public faces: number;
    public average: number;

    constructor(amount: number, faces: number) {
        this.amount = amount;
        this.faces = faces;
        this.average = Math.floor(Dice.average(this.amount, this.faces));
    }

    public roll(bonus: number = 0): number {
        return this.roll_AllInfo(bonus).total;
    }

    public roll_AllInfo(bonus: number = 0): Roll {
        return Dice.roll_AllInfo(this.amount, this.faces, bonus);
    }

    public static roll(amount: number, faces: number, bonus: number = 0): number {
        return Dice.roll_AllInfo(amount, faces, bonus).total;
    }

    public static roll_AllInfo(amount: number, faces: number, bonus: number = 0): Roll {
        let rolls: number[];
        let sum: number = 0;
        for (let counter: number = 0; counter < amount; counter++) {
            let roll: number = Math.floor(Math.random() * faces) + 1;
            rolls.push(roll);
            sum += roll;
        }
        return new Roll(rolls, sum, sum + bonus);
    }

    public static average(amount: number, faces: number): number {
        let sum: number = 0;
        for (let c: number = 1; c <= faces; c++) {
            sum += c;
        }
        return amount * (sum / faces);
    }
}

export class Roll {
    public rolls: number[];
    public natural: number;
    public total: number;

    constructor(rolls: number[], natural?: number, total?: number) {
        this.rolls = rolls;
        if (natural)
            this.natural = natural;
        else {
            this.natural = 0;
            rolls.forEach((roll: number) => {
                this.natural += roll;
            });
        }
        this.total = total ? total : this.natural;
    }
}