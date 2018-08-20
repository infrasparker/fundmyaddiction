import { Dice, Roll } from "../../mechanics/dice/dice.model";
import { DamageType } from "../../mechanics/damage/damage.model";
import { Entity } from "../entity.model";
import { scoreToMod } from "../../functions/functions";
import { StatType } from "../statType.model";

export abstract class Creature extends Entity {
    public abstract name: string;
    public abstract description: string;

    // #region stat scores and modifiers
    protected abstract get_statScore_base(stat: StatType): number;
    
    private statScores_bonus: [number, number, number, number, number, number];
    protected get_statScore(stat: StatType): number {
        return this.get_statScore_base(stat) + this.statScores_bonus[stat];
    }
    protected set_statScore(stat: StatType, score: number): void {
        this.statScores_bonus[stat] = score - this.get_statScore_base(stat);
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
    
    // #region hit points
    protected abstract hitDice: Dice;
    public get level(): number {
        return this.hitDice.amount;
    }
    public get size(): CreatureSize {
        return this.hitDice.faces;
    }
    public set size(size: CreatureSize) {
        this.hitDice.faces = size;
    }

    protected abstract hitPoints_roll: Roll;
    private hitPoints_max_bonus: number;
    public get hitPoints_max(): number {
        return this.hitPoints_roll.total + this.level * this.constitution_mod + this.hitPoints_max_bonus;
    }
    public set hitPoints_max(hitPoints: number) {
        this.hitPoints_max_bonus = hitPoints - this.hitPoints_max;
        this.hitPoints = Math.min(this.hitPoints_max, this.hitPoints);
    }
    // #endregion

    // #region armor
    protected abstract get armor_class_base(): number;
    private armor_class_bonus: number;
    public get armor_class(): number {
        return this.armor_class_base + this.armor_class_bonus;
    }
    // #endregion

    // #region damage resistances and immunities
    protected abstract damageResistances_base: Map<DamageType, number>;

    public get_damageResistance_base(type: DamageType): number {
        return this.damageResistances_base.get(type) || 0;
    }

    protected abstract damageImmunities: Map<DamageType, number>;
    public get_damageImmunity(type: DamageType): number {
        return this.damageImmunities.get(type) || 0;
    }
    public addDamageImmunity(type: DamageType): void {
        this.damageImmunities.set(type, this.damageImmunities.get(type) + 1);
    }
    public subDamageImmunity(type: DamageType): void {
        this.damageImmunities.set(type, this.damageImmunities.get(type) - 1);
    }
    // #endregion

    constructor() {
        super();
    }
}

export enum CreatureSize {
    Tiny = 4,
    Small = 6,
    Medium = 8,
    Large = 10,
    Huge = 12,
    Gargantuan = 20
}