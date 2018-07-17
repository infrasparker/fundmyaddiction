import { Item } from "./item.model";
import { capitalize } from "../functions/functions";

export class Armor extends Item {
    public readonly armor: number;
    public readonly armorType: ArmorType;
    public readonly stealthPenalty: boolean;
    public readonly slot: ArmorSlot;

    constructor(
        name: string, description: string, cost: number, weight: number,
        armor: number, armorType: ArmorType, stealthPenalty: boolean, slot: ArmorSlot
    ) {
        super(name, description, cost, weight);
        this.armor = armor;
        this.armorType = armorType;
        this.stealthPenalty = stealthPenalty;
        this.slot = slot;
    }

    public quickInfoBox(): string {
        return "<p>" + capitalize(this.armorType) + " " + this.slot + " armor" +
        (this.stealthPenalty ? "<br>Disadvantage on Dexterity (Stealth) checks</p>" : "</p>") +
        "<p><i>Armor Bonus:</i> " + this.armor + "</p>";
    }

    public static standard_armor(name: string): Armor {
        switch (name.toLowerCase()) {
            case "padded" : return new Armor(
                "Padded", "Gambeson, mostly used for dulling arrow and bolt impacts.", 10, 2,
                1, ArmorType.Light, false, ArmorSlot.Torso
            );
            default : throw "Unknown weapon";
        }
    }
}

export enum ArmorSlot {
    Head = "head",
    Torso = "torso",
    Hands = "hands",
    Legs = "legs",
    Feet = "feet"
}

export enum ArmorType {
    Light = "light",
    Medium = "medium",
    Heavy = "heavy",
    Shield = "shield"
}