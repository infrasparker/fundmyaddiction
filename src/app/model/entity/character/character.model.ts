import { Entity } from "../entity.model";
import { StatType } from "../statType.model";
import { scoreToMod } from "../../functions/functions";
import { Race } from "./race/race.model";
import { AdvClass } from "./class/adv-class.model";

export abstract class Character extends Entity {
    public race: Race;
    public type: AdvClass;

    constructor(race: Race, type: AdvClass, str: number, dex: number, con: number, int: number, wis: number, cha: number) {
        super();
        this.race = race;
        this.type = type;
        this
    }

    // #region stat scores and modifiers
    private readonly statScores_base: [number, number, number, number, number, number];
    protected get_statScore_base(stat: StatType): number {
        return this.statScores_base[stat];
    }
    
    private statScores_bonus: [number, number, number, number, number, number];
    protected get_statScore(stat: StatType): number {
        return this.get_statScore_base(stat) + this.statScores_bonus[stat] + this.race.get_statBonus(stat);
    }
    protected set_statScore(stat: StatType, score: number): void {
        this.statScores_bonus[stat] = score - this.get_statScore_base(stat) - this.race.get_statBonus(stat);
    }

    public get strength_score(): number {
        return this.get_statScore(StatType.Strength);
    }
    public set strength_score(score: number) {
        this.set_statScore(StatType.Strength, score);
    }
    public get strength_mod(): number {
        return scoreToMod(this.strength_score);
    }

    public get dexterity_score(): number {
        return this.get_statScore(StatType.Dexterity);
    }
    public set dexterity_score(score: number) {
        this.set_statScore(StatType.Dexterity, score);
    }
    public get dexterity_mod(): number {
        return scoreToMod(this.dexterity_score);
    }

    public get constitution_score(): number {
        return this.get_statScore(StatType.Constitution);
    }
    public set constitution_score(score: number) {
        this.set_statScore(StatType.Constitution, score);
    }
    public get constitution_mod(): number {
        return scoreToMod(this.constitution_score);
    }

    public get intelligence_score(): number {
        return this.get_statScore(StatType.Intelligence);
    }
    public set intelligence_score(score: number) {
        this.set_statScore(StatType.Intelligence, score);
    }
    public get intelligence_mod(): number {
        return scoreToMod(this.intelligence_score);
    }

    public get wisdom_score(): number {
        return this.get_statScore(StatType.Wisdom);
    }
    public set wisdom_score(score: number) {
        this.set_statScore(StatType.Wisdom, score);
    }
    public get wisdom_mod(): number {
        return scoreToMod(this.wisdom_score);
    }

    public get charisma_score(): number {
        return this.get_statScore(StatType.Charisma);
    }
    public set charisma_score(score: number) {
        this.set_statScore(StatType.Charisma, score);
    }
    public get charisma_mod(): number {
        return scoreToMod(this.charisma_score);
    }
    // #endregion
}