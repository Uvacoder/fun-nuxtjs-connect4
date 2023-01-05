import Player from "~/engine/Player";
import Board from "~/engine/Board";
import {useMachine} from "@xstate/vue";
import connectFourMachine from "~/machines/connectFourMachine";
import {BaseActionObject, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled} from "xstate";

class Connect4 {

    private readonly players: Array<Player>;
    private readonly board: Board;
    private readonly winningLength: number;
    private readonly timeLimitPerPlayer: number;
    private readonly rows: number;
    private readonly columns: number;
    private currentPlayer: Player;
    private isGameOver: boolean;
    private winner: Player | undefined;
    private isDraw: boolean;
    public gameState = useMachine(connectFourMachine).state.value.value;

    constructor(players: Array<Player>, rows: number, columns: number, winningLength: number, timeLimitPerPlayer: number) {
        this.players = players;
        this.board = new Board(rows, columns);
        this.winningLength = winningLength;
        this.timeLimitPerPlayer = timeLimitPerPlayer;
        this.rows = rows;
        this.columns = columns;
        this.currentPlayer = this.initializeRandomPlayer();
        this.isGameOver = false;
        this.winner = undefined;
        this.isDraw = false;
    }

    public getPlayers(): Array<Player> {
        return this.players;
    }

    public getGameState(): string {
        return <string>this.gameState;
    }

    public initializeRandomPlayer(): Player {
        const randomIndex = Math.floor(Math.random() * this.players.length);
        return this.players[randomIndex];
    }

    public getBoard(): Board {
        return this.board;
    }

    public getWinningLength(): number {
        return this.winningLength;
    }

    public gettimeLimitPerPlayer(): number {
        return this.timeLimitPerPlayer;
    }

    public getRows(): number {
        return this.rows;
    }

    public getColumns(): number {
        return this.columns;
    }

    public getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    public getIsGameOver(): boolean {
        return this.isGameOver;
    }

    public getWinner(): Player | undefined {
        return this.winner;
    }

    public getIsDraw(): boolean {
        return this.isDraw;
    }

    public setIsGameOver(isGameOver: boolean): void {
        this.isGameOver = isGameOver;
    }

    public setWinner(winner: Player): void {
        this.winner = winner;
    }

    public setIsDraw(isDraw: boolean): void {
        this.isDraw = isDraw;
    }

    public switchNextPlayer(): void {
        const nextPlayerIndex = (this.players.indexOf(this.currentPlayer) + 1) % this.players.length;
        this.currentPlayer = this.players[nextPlayerIndex];
    }

    public checkIfGameOver(): void {
        if (this.checkIfWinner()) {
            this.setIsGameOver(true);
            this.setWinner(this.currentPlayer);
        } else if (this.checkIfDraw()) {
            this.setIsGameOver(true);
            this.setIsDraw(true);
        }
    }

    public checkIfWinner(): boolean {
        return this.checkIfHorizontalWinner() || this.checkIfVerticalWinner() || this.checkIfDiagonalWinner();
    }

    public checkIfHorizontalWinner(): boolean {
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows - this.winningLength + 1; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (this.board.getCell(row + i, column).getPlayer() === this.currentPlayer) {
                        count++;
                    }
                }
                if (count === this.winningLength) {
                    return true;
                }
            }
        }
        return false;
    }

    public checkIfVerticalWinner(): boolean {
        for (let column = 0; column < this.columns - this.winningLength + 1; column++) {
            for (let row = 0; row < this.rows; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (this.board.getCell(row, column + i).getPlayer() === this.currentPlayer) {
                        count++;
                    }
                }
                if (count === this.winningLength) {
                    return true;
                }
            }
        }
        return false;
    }

    public checkIfDiagonalWinner(): boolean {
        return this.checkIfLeftDiagonalWinner() || this.checkIfRightDiagonalWinner();
    }

    public checkIfLeftDiagonalWinner(): boolean {
        for (let column = 0; column < this.columns - this.winningLength + 1; column++) {
            for (let row = 0; row < this.rows - this.winningLength + 1; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (this.board.getCell(row + i, column + i).getPlayer() === this.currentPlayer) {
                        count++;
                    }
                }
                if (count === this.winningLength) {
                    return true;
                }
            }
        }
        return false;
    }

    public checkIfRightDiagonalWinner(): boolean {
        for (let column = this.winningLength - 1; column < this.columns; column++) {
            for (let row = 0; row < this.rows - this.winningLength + 1; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (this.board.getCell(row + i, column - i).getPlayer() === this.currentPlayer) {
                        count++;
                    }
                }
                if (count === this.winningLength) {
                    return true;
                }
            }
        }
        return false;
    }

    public checkIfDraw(): boolean {
        return this.board.getCells().every(cell => cell.getPlayer() !== undefined);
    }

    public play(column: number): void {
        const row = this.board.getLowestEmptyRow(column);
        this.board.getCell(row, column).setPlayer(this.currentPlayer);
        this.checkIfGameOver();
        this.switchNextPlayer();
    }
}

export default Connect4;