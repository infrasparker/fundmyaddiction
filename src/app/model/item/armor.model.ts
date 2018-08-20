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
        return "<p" + (this.stealthPenalty ? " class='br'" : "") + ">" + capitalize(this.armorType) + " " + this.slot + " armor</p>" +
        (this.stealthPenalty ? "</p>Disadvantage on Dexterity (Stealth) checks</p>" : "") +
        "<p class='br'><i>Armor Bonus:</i> " + this.armor + "</p>";
    }

    public static standard_armor(name: string): Armor {
        switch (name.toLowerCase()) {
            case "gambeson chestpiece" : return new Armor(
                "Gambeson chestpiece", "Gambeson, mostly used for dulling arrow and bolt impacts.", 500, 8,
                1, ArmorType.Light, false, ArmorSlot.Torso
            );
            case "leather chestpiece" : return new Armor(
                "Leather Chestpiece", "A set of armor made with softer leather sheets, allowing a higher degree of movement.", 1000, 10,
                2, ArmorType.Light, false, ArmorSlot.Torso
            );
            case "scale chestpiece" : return new Armor(
                "Scale Chestpiece", "Armor made of small overlapping metal plates, usually backed by cloth or leather.", 5000, 45,
                3, ArmorType.Medium, true, ArmorSlot.Torso
            );
            case "chain chestpiece" : return new Armor(
                "Chain Shirt", "A shirt made of interlocking chains. Just make sure nobody aims for your limbs.", 5000, 20,
                3, ArmorType.Heavy, true, ArmorSlot.Torso
            );
            case "plate chestpiece" : return new Armor(
                "Plate Chestpiece", "A chestpiece made of solid metal plates.", 150000, 20,
                4, ArmorType.Heavy, true, ArmorSlot.Torso
            );
            default : throw new Error("Unknown armor");
        }
    }

    public static armorType_max(a: ArmorType, b: ArmorType): ArmorType {
        let type: ArmorType;
        if (a === ArmorType.Light || b === ArmorType.Light) {
            type = ArmorType.Light;
        }
        if (a === ArmorType.Medium || b === ArmorType.Medium) {
            type = ArmorType.Medium;
        }
        if (a === ArmorType.Heavy || b === ArmorType.Heavy) {
            type = ArmorType.Heavy;
        }
        return type;
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
    Heavy = "heavy"
}