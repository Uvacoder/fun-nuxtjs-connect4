import Player from "~/engine/Player";
import Board from "~/engine/Board";
import {useMachine} from "@xstate/vue";
import connectFourMachine from "~/machines/connectFourMachine";
import Cell from "~/engine/Cell";

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

    public initializeRandomPlayer(): Player {
        const randomIndex = Math.floor(Math.random() * this.players.length);
        return this.players[randomIndex];
    }

    public getPlayers(): Array<Player> {
        return this.players;
    }

    public getBoard(): Board {
        return this.board;
    }

    public getWinningLength(): number {
        return this.winningLength;
    }

    public getTimeLimitPerPlayer(): number {
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

    public setCurrentPlayer(currentPlayer: Player): void {
        this.currentPlayer = currentPlayer;
    }

    public setIsGameOver(isGameOver: boolean): void {
        this.isGameOver = isGameOver;
    }

    public setWinner(winner: Player | undefined): void {
        this.winner = winner;
    }

    public setIsDraw(isDraw: boolean): void {
        this.isDraw = isDraw;
    }

    public switchNextPlayer(): void {
        const nextPlayerIndex = (this.players.indexOf(this.currentPlayer) + 1) % this.players.length;
        this.currentPlayer = this.players[nextPlayerIndex];
    }

    public playToken(column: number): void {
        // check if column is full or game is over
        if (this.board.isColumnFull(column) || this.isGameOver) {
            return;
        }

        // play token
        const row = this.board.getLowestEmptyRow(column);
        this.board.getGrid()[column][row].setPlayer(this.currentPlayer);

        // check if game is over
        this.checkIfGameOver();

        // switch next player
        this.switchNextPlayer();

    }

    public checkIfGameOver(): void {
        if (this.checkIfWinner()) {
            this.setIsGameOver(true);
            this.setWinner(this.currentPlayer);
            console.log("Game over! Winner is " + this.currentPlayer.getName());
        } else if (this.checkIfDraw()) {
            this.setIsGameOver(true);
            this.setIsDraw(true);
        }
    }

    public getPlayerTurn(): Player {
        return this.currentPlayer;
    }

    public getWinningCells(): any {
        // get cells that are part of the winning line of 4
        const grid = this.board.getGrid();
        const winningCells = [];
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows - this.winningLength + 1; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (grid[column][row + i].getPlayer() === this.currentPlayer) {
                        count++;
                        winningCells.push(grid[column][row + i]);
                    }
                }
                if (count === this.winningLength) {
                    return winningCells;
                }
            }
        }

        for (let column = 0; column < this.columns - this.winningLength + 1; column++) {
            for (let row = 0; row < this.rows; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (grid[column + i][row].getPlayer() === this.currentPlayer) {
                        count++;
                        winningCells.push(grid[column + i][row]);
                    }
                }
                if (count === this.winningLength) {
                    return winningCells;
                }
            }
        }

        for (let column = 0; column < this.columns - this.winningLength + 1; column++) {
            for (let row = 0; row < this.rows - this.winningLength + 1; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (grid[column + i][row + i].getPlayer() === this.currentPlayer) {
                        count++;
                        winningCells.push(grid[column + i][row + i]);
                    }
                }
                if (count === this.winningLength) {
                    return winningCells;
                }
            }
        }

        for (let column = this.columns - 1; column >= this.winningLength - 1; column--) {
            for (let row = 0; row < this.rows - this.winningLength + 1; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (grid[column - i][row + i].getPlayer() === this.currentPlayer) {
                        count++;
                        winningCells.push(grid[column - i][row + i]);
                    }
                }
                if (count === this.winningLength) {
                    return winningCells;
                }
            }
        }

        return winningCells;
    }


    public checkIfWinner(): boolean {
        if (this.checkIfHorizontalWinner() || this.checkIfVerticalWinner() || this.checkIfDiagonalWinner()) {
            // get the 4 winning cells and set them to setIsHighlighted(true)
            const winningCells = this.getWinningCells();
            for (let i = 0; i < winningCells.length; i++) {
                winningCells[i].setIsHighlighted(true);
            }
            return true;
        } else {
            return false;
        }

    }

    public checkIfHorizontalWinner(): boolean {
        const grid = this.board.getGrid();
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows - this.winningLength + 1; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (grid[column][row + i].getPlayer() === this.currentPlayer) {
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
        const grid = this.board.getGrid();
        for (let column = 0; column < this.columns - this.winningLength + 1; column++) {
            for (let row = 0; row < this.rows; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (grid[column + i][row].getPlayer() === this.currentPlayer) {
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
        const grid = this.board.getGrid();
        for (let column = 0; column < this.columns - this.winningLength + 1; column++) {
            for (let row = 0; row < this.rows - this.winningLength + 1; row++) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (grid[column + i][row + i].getPlayer() === this.currentPlayer) {
                        count++;
                    }
                }
                if (count === this.winningLength) {
                    return true;
                }
            }
        }
        for (let column = 0; column < this.columns - this.winningLength + 1; column++) {
            for (let row = this.rows - 1; row >= this.winningLength - 1; row--) {
                let count = 0;
                for (let i = 0; i < this.winningLength; i++) {
                    if (grid[column + i][row - i].getPlayer() === this.currentPlayer) {
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
        const grid = this.board.getGrid();
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows; row++) {
                if (grid[column][row].getPlayer() === undefined) {
                    return false;
                }
            }
        }
        return true;
    }


}

export default Connect4;