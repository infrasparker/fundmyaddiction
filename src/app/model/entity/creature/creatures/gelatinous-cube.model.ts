import { Creature, CreatureSize } from "../creature.model";
import { Dice, Roll } from "../../../mechanics/dice/dice.model";
import { DamageType } from "../../../mechanics/damage/damage.model";
import { StatType } from "../../statType.model";

export class GelatinousCube extends Creature {
    public name: string;
    public description: string;

    private statScores_base: [number, number, number, number, number, number];
    protected get_statScore_base(stat: StatType): number {
        return this.statScores_base[stat];
    }

    protected hitDice: Dice;
    protected hitPoints_roll: Roll;
    private _hitPoints: number;
    public get hitPoints(): number {
        return this._hitPoints;
    }
    public set hitPoints(hitPoints: number) {
        this.hitPoints = hitPoints;
        if (hitPoints <= 0) {
            this.alive = false;
        }
    }

    public get armor_class_base(): number {
        return 10 + this.dexterity_mod;
    }

    protected damageResistances_base: Map<DamageType, number>;

    protected damageImmunities: Map<DamageType, number>;

    constructor() {
        super();
        this.name = "Gelatinous Cube";
        this.description = "What gave it away, the floating skeletons?";
        this.statScores_base = [14, 3, 20, 1, 6, 1];
        this.hitDice = new Dice(8, 10);
        this.hitPoints_roll = this.hitDice.roll_AllInfo();
        this.hitPoints;
        this.damageResistances_base = new Map<DamageType, number>();
        this.damageImmunities = new Map<DamageType, number>();
    }
}