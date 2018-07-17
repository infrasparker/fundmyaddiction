import { Item } from "./item.model";
import { Dice } from "../mechanics/dice/dice.model";
import { capitalize, bonus_toString } from "../functions/functions";

export class Weapon extends Item {
    public readonly rangeType: WeaponRangeType;
    public readonly weaponType: WeaponType;
    public readonly finesse: boolean;
    public readonly damage: Map<DamageType, DamageInfo>;
    public readonly bonus: number;

    constructor(
        name: string, description: string, cost: number, weight: number,
        rangeType: WeaponRangeType, type: WeaponType, finesse: boolean,
        damage: Map<DamageType, DamageInfo>, bonus: number = 0
    )
    {
        super(name, description, cost, weight);
        this.rangeType = rangeType;
        this.weaponType = type;
        this.finesse = finesse;
        this.damage = damage;
        this.bonus = bonus;
    }

    public quickInfoBox(): string {
        let info: string = "<p>" + capitalize(this.weaponType) + " " + this.rangeType + " weapon" +
        (this.finesse ? "<br>Finesse</p>": "</p>");
        info += "<p><i>" + capitalize(this.rangeType) + " Weapon Attack:</i>";
        if (this.bonus > 0) {
            info += " +" + this.bonus;
        } else if (this.bonus < 0) {
            info += " -" + this.bonus * -1;
        }
        info += " + " + this.dex_str() + " + proficiency to hit<br>";
        info += "<i>Hit:</i>";
        this.damage.forEach((value: DamageInfo, key: DamageType) => {
            if (value.dice.amount === 0)
                info += " 1";
            else
                info += " " + value.dice.amount + "d" + value.dice.faces;
            if (this.bonus > 0)
                info += " + " + this.bonus;
            else if (this.bonus < 0)
                info += " - " + this.bonus * -1;
            info += (value.addMod ? (" + " + this.dex_str()) : "") + " " + key + " damage plus ";
        });
        info = info.substring(0, info.length - 6) + "</p>";
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
                new Map([
                    [DamageType.Laceration, new DamageInfo(true, 1, 6)]
                ])
            );
            default : throw "Unknown weapon";
        }
    }
}

class DamageInfo {
    public addMod: boolean;
    public dice: Dice;

    constructor(addMod: boolean, amount: number, faces: number) {
        this.addMod = addMod;
        this.dice = new Dice(amount, faces);
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