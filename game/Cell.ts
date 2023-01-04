import {Player} from "~/game/Player";

export class Cell {
    private readonly row: number;
    private readonly column: number;
    private player: Player;
    private isAlive: boolean;

    constructor(row: number, column: number, player: Player) {
        this.row = row;
        this.column = column;
        this.player = player;
        this.isAlive = false;
    }

    public getRow(): number {
        return this.row;
    }

    public getColumn(): number {
        return this.column;
    }

    public getIsAlive(): boolean {
        return this.isAlive;
    }

    public setAlive(isAlive: boolean): void {
        this.isAlive = isAlive;
    }

    getPlayer() {
        return this.player;
    }

    setIsAlive(b: boolean) {
        this.isAlive = b;
    }

    setPlayer(player: Player) {
        this.player = player;
    }
}