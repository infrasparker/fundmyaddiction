import { Race } from "../race.model";

export abstract class Dwarf extends Race {
    public get constitution_bonus(): number {
        return 2;
    }
}

export class HillDwarf extends Dwarf {
    public get name(): string {
        return "Hill Dwarf";
    }
    public get description(): string {
        return "Hill Dwarf";
    }

    public get wisdom_bonus(): number {
        return 1;
    }
}

export class MountainDwarf extends Dwarf {
    public get name(): string {
        return "Mountain Dwarf";
    }
    public get description(): string {
        return "Mountain Dwarf";
    }

    public get strength_bonus(): number {
        return 1;
    }
}