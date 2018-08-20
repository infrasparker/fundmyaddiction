import { Item } from "./item.model";
import { Dice } from "../mechanics/dice/dice.model";
import { capitalize, bonus_toString } from "../functions/functions";
import { DamageType } from "../mechanics/damage/damage.model";

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
        let info: string = "<p" + (this.finesse ? " class='br'" : "") + ">" + capitalize(this.weaponType) + " " + this.rangeType + " weapon</p>" +
        (this.finesse ? "<p>Finesse</p>": "");
        info += "<p class='br'><i>" + capitalize(this.rangeType) + " Weapon Attack:</i>";
        if (this.bonus > 0) {
            info += " +" + this.bonus;
        } else if (this.bonus < 0) {
            info += " -" + this.bonus * -1;
        }
        info += " + " + this.dex_str() + " + proficiency to hit</p>";
        info += "<p class='br'><i>Hit:</i>";
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
            default : throw new Error("Unknown weapon");
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

export enum WeaponRangeType {
    Melee = "melee",
    Ranged = "ranged"
}

export enum WeaponType {
    Simple = "simple",
    Martial = "martial"
}