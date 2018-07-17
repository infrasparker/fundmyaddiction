export function capitalize(s: string): string {
    return s.substr(0, 1).toUpperCase() + s.substring(1);
}

export function bonus_toString(bonus: number, space_between: boolean): string {
    if (bonus >= 0) {
        return "+" + (space_between ? " " : "") + bonus;
    } else {
        return (space_between ? "- " + bonus * -1 : bonus.toString());
    }
}