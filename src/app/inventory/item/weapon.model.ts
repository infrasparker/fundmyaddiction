import { Item } from "./item.model";
import { Dice } from "../../mechanics/dice/dice.model";
import { capitalize, bonus_toString } from "../../functions/functions";

export class Weapon extends Item {
    public rangeType: WeaponRangeType;
    public type: WeaponType;
    public finesse: boolean;

    public damageType: DamageType;
    public damageRoll: Dice;

    constructor(
        name: string, description: string, cost: number, weight: number,
        rangeType: WeaponRangeType, type: WeaponType, finesse: boolean,
        damageType: DamageType, damageRollAmount: number, damageRollFaces: number, damageRollBonus: number = 0
    )
    {
        super(name, description, cost, weight);
        this.rangeType = rangeType;
        this.type = type;
        this.finesse = finesse;
        this.damageType = damageType;
        this.damageRoll = new Dice(damageRollAmount, damageRollFaces, damageRollBonus);
    }

    public descriptionBox(): string {
        return "<p>" + capitalize(this.type) + " " + this.rangeType + " weapon.<br>" +
        "Can add " + this.dex_str(true) + " to hit and damage rolls.</p>" +
        "<p>" + this.description + "</p>";
    }

    public quickInfoBox(): string {
        console.log(this.rangeType);
        let info: string = "<p><i>" + capitalize(this.rangeType) + " Weapon Attack: </i>";
        if (this.damageRoll.bonus > 0) {
            info += "+" + this.damageRoll.bonus + " ";
        } else if (this.damageRoll.bonus < 0) {
            info += this.damageRoll.bonus + " ";
        }
        info += "+ " + this.dex_str() + " + proficiency to hit.</p>";
        info += "<p><i>Hit:</i> " + this.damageRoll.average + " (" + this.damageRoll.amount + "d" + this.damageRoll.faces + " ";
        if (this.damageRoll.bonus > 0) {
            info += "+ " + this.damageRoll.bonus + " ";
        } else if (this.damageRoll.bonus < 0) {
            info += "- " + this.damageRoll.bonus * -1 + " ";
        }
        info += "+ " + this.dex_str() + ") " + this.damageType + " damage.</p>";
        return info;
    }

    public dex_str(longForm: boolean = false): string {
        return Weapon.dex_str(this.rangeType, this.finesse, longForm);
    }

    public static dex_str(rangeType: WeaponRangeType, finesse: boolean, longForm: boolean = false) {
        if (rangeType === WeaponRangeType.Ranged)
            return longForm ? "dexterity" : "DEX"; 
        else {
            if (finesse)
                return longForm ? "strength or dexterity" : "STR/DEX";
            else
                return longForm ? "strength" : "STR";
        }
    }

    public static standard_weapon(name: string): Weapon {
        switch (name.toLowerCase()) {
            case "club" : return new Weapon(
                "Club", "A stick, generally used for hitting things.", 10, 2,
                WeaponRangeType.Melee, WeaponType.Simple, false,
                DamageType.Bludgeoning, 1, 4
            );
            default : throw "Unknown weapon";
        }
    }
}

export class Damage {
    public damage: Map<DamageInfo, DamageType>;

    constructor(damage: Map<DamageType, DamageInfo>) {

    }

    public add(damage: {(type: DamageType): {"dice": Dice, "addMod": boolean}}): void {
        
    }
}

class DamageInfo {
    public dice: Dice;
    public addMod: boolean;

    constructor(dice: Dice, addMod: boolean) {
        this.dice = dice;
        this.addMod = addMod;
    }
}

export enum DamageType {
    Arcane = "arcane", // Pure magical energy
    Bludgeoning = "bludgeoning", // Raw physical force
    Corrosion = "corrosion", // Chemical deconstruction or alteration
    Divine = "divine", // Borrowed from the heavens
    Fire = "fire", // Intense heat
    Frost = "frost", // Intense cold
    Laceration = "laceration", // Stabs and slashes
    Lightning = "lightning", // The power of electricity
    Necrotic = "necrotic", // Corrupting ones identity
    Toxic = "toxic", // Biotoxins, radiation, and synthetic poison alike
}

export enum WeaponRangeType {
    Melee = "melee",
    Ranged = "ranged"
}

export enum WeaponType {
    Simple = "simple",
    Martial = "martial"
}