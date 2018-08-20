import { Entity } from "../entity.model";
import { DamageType } from "../../mechanics/damage/damage.model";

export class Inanimate extends Entity {
    public readonly name: string;

    public readonly hitPoints_max: number;
    private _hitPoints: number;
    public get hitPoints(): number {
        return this._hitPoints;
    }
    public set hitPoints(hitPoints: number) {
        if (hitPoints <= 0) {
            this.hitPoints = 0;
            this.alive = false;
        } else if (hitPoints > this.hitPoints_max) {
            this.hitPoints = this.hitPoints_max;
        }
    }
    public alive: boolean;

    public armor_class: number;

    // #region damage resistances and immunities
    private damageResistances_base: Map<DamageType, number>;
    protected get_damageResistance_base(type: DamageType): number {
        return this.damageResistances_base.get(type);
    }

    private damageImmunities: Map<DamageType, number>;
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

    constructor(
        name: string, hitPoints_max: number, armor_class: number,
        damageResistances: Map<DamageType, number> = new Map<DamageType, number>([[DamageType.Laceration, .5]]),
        damageImmunities: Map<DamageType, number> = new Map<DamageType, number>([[DamageType.Toxic, 1], [DamageType.Psychic, 1]])
    ) {
        super();
        this.name = name;
        this.hitPoints_max = hitPoints_max;
        this.hitPoints = hitPoints_max;
        this.alive = true;
        this.armor_class = armor_class;
        this.damageResistances_base = damageResistances;
        this.damageImmunities = damageImmunities;
    }
}