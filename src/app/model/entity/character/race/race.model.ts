import { StatType } from "../../statType.model";

export abstract class Race {
    public abstract get name(): string;
    public abstract get description(): string;

    public get_statBonus(stat: StatType): number {
        switch (stat) {
            case StatType.Strength: return this.strength_bonus;
            case StatType.Dexterity: return this.dexterity_bonus;
            case StatType.Constitution: return this.constitution_bonus;
            case StatType.Intelligence: return this.intelligence_bonus;
            case StatType.Wisdom: return this.wisdom_bonus;
            case StatType.Charisma: return this.charisma_bonus;
            default: throw new Error("Invalid stat type given");
        }
    }
    
    public get strength_bonus(): number {
        return 0;
    }
    public get dexterity_bonus(): number {
        return 0;
    }
    public get constitution_bonus(): number {
        return 0;
    }
    public get intelligence_bonus(): number {
        return 0;
    }
    public get wisdom_bonus(): number {
        return 0;
    }
    public get charisma_bonus(): number {
        return 0;
    }
}