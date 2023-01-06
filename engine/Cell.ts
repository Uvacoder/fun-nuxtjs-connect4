import Player from "~/engine/Player";

class Cell {

    private readonly row: number;
    private readonly column: number;
    private player?: Player;
    private isAlive: boolean;
    private isHighlighted: boolean;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
        this.player = undefined;
        this.isAlive = false;
        this.isHighlighted = false;
    }

    public getRow(): number {
        return this.row;
    }

    public getColumn(): number {
        return this.column;
    }

    public getPlayer(): Player | undefined {
        return this.player;
    }

    public getIsAlive(): boolean {
        return this.isAlive;
    }

    public setIsHighlighted(isHighlighted: boolean): void {
        this.isHighlighted = isHighlighted;
    }

    public getIsHighlighted(): boolean {
        return this.isHighlighted;
    }

    public setPlayer(player: Player): void {
        this.player = player;
    }

    public setIsAlive(isAlive: boolean): void {
        this.isAlive = isAlive;
    }

    public isOccupied(): boolean {
        return this.player !== undefined;
    }

}

export default Cell;