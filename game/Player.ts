export class Player {
    static RED = new Player("#a82a2a");
    static YELLOW = new Player("#f2d94e");
    static NONE = new Player("none");
    private readonly color: string;

    constructor(color: string) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    public getOpponent(): Player {
        if (this.color === '#a82a2a') {
            return Player.YELLOW;
        } else if (this.color === '#f2d94e') {
            return Player.RED;
        } else {
            return Player.NONE;
        }
    }
}