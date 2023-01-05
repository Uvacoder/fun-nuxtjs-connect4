import Player from "~/engine/Player";

class Cell {

    private readonly row: number;
    private readonly column: number;
    private player?: Player;
    private isAlive: boolean;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
        this.player = undefined;
        this.isAlive = false;
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

    public setPlayer(player: Player): void {
        this.player = player;
    }

    public setIsAlive(isAlive: boolean): void {
        this.isAlive = isAlive;
    }

}

export default Cell;