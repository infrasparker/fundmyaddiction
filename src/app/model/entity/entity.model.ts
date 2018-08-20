import { DamageType } from "../mechanics/damage/damage.model";

/**
 * Overarching class that represents existing things
 */
export abstract class Entity {

    /**
     * Name of the entity
     */
    public abstract name: string;

    /**
     * Maximum possible amount of hitpoints
     */
    public abstract hitPoints_max: number;
    /**
     * Current amount of hitpoints
     */
    public abstract hitPoints: number;

    /**
     * Determines whether or not the entity is destroyed/dead or intact/alive
     */
    public alive: boolean;

    /**
     * A numerical value that determines how difficult the entity is to strike
     */
    public abstract armor_class: number;

    // #region damage resistances and immunities
    // #region resistances
    /**
     * Retrieves the base damage resistance value, inherent to the entity and unchanging
     * @param type a DamageType that selects which resistance to retrieve
     */
    protected abstract get_damageResistance_base(type: DamageType): number;

    /**
     * Map of DamageTypes to numbers which are the corresponding damage resistance values
     */
    private damageResistances_bonus: Map<DamageType, number>;

    /**
     * 
     * Resistance values should be a multiplier, with values greater than 1 being health restores
     * @param type a DamageType that selects which resistance to retrieve
     */
    public get_damageResistance(type: DamageType): number {
        return (this.get_damageResistance_base(type) || 0) + (this.damageResistances_bonus.get(type) || 0);
    }
    public set_damageResistance(type: DamageType, resistance: number): void {
        this.damageResistances_bonus.set(type, resistance - (this.get_damageResistance_base(type) || 0));
    }
    // #endregion

    // #region immunities
    public abstract get_damageImmunity(type: DamageType): number;
    public abstract addDamageImmunity(type: DamageType): void;
    public abstract subDamageImmunity(type: DamageType): void;
    // #endregion
    // #endregion damage resistances and immunities

    constructor() {
        this.alive = true;
        this.damageResistances_bonus = new Map<DamageType, number>();
    }
}