export class Player {
    private name: string;
    private credits: number;

    constructor(name: string, credits: number = 0) {
        this.name = name;
        this.credits = credits;
    }

    /**
     * Attempts to add or subtract the given value to the player's credits.
     * @param credits The amount of credits to change, either positively or negatively.
     * @returns True if the transaction occurred, false if it did not (the player did not have enough credits).
     */
    public changeCredits(credits: number): boolean {
        let newCredits: number = this.credits + credits;
        if (newCredits >= 0) {
            this.credits = newCredits;
            return true;
        } else
            return false;

    }
}