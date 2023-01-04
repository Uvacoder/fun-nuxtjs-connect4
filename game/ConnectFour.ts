import {Board} from "~/game/Board";
import {Cell} from "~/game/Cell";
import {Player} from "~/game/Player";

export class ConnectFour {
    private readonly columns: number;
    private readonly rows: number;
    private readonly alignementsToWin: number;
    private readonly board: Board;
    private playerTurn: Player;
    private gameOver: boolean = false;

    constructor(columns: number, rows: number, alignementsToWin: number) {
        this.columns = columns;
        this.rows = rows;
        this.alignementsToWin = alignementsToWin;
        this.board = new Board(rows, columns);
        this.playerTurn = this.getPlayerRandomTurn();
    }

    public getColumns(): number {
        return this.columns;
    }


    private getPlayerRandomTurn(): Player {
        return Math.random() < 0.5 ? Player.RED : Player.YELLOW;
    }

    public getRows(): number {
        return this.rows;
    }

    public getAlignementsToWin(): number {
        return this.alignementsToWin;
    }

    public getBoard(): Board {
        return this.board;
    }

    public getCell(row: number, column: number): Cell {
        return this.board.getCell(row, column);
    }

    public setCell(row: number, column: number, cell: Cell): void {
        this.board.setCell(row, column, cell);

    }


    public getPlayerTurn(): Player {
        return this.playerTurn;
    }

    public isWithDraw(): boolean {
        for (let i = 0; i < this.columns; i++) {
            if (!this.board.getCell(0, i).getIsAlive()) {
                return false;
            }
        }
        return true;
    }

    public playCell(row: number, column: number, player: Player): void {
        if (this.gameOver) return;
        // get all cells in the same column
        let cells = new Array<Cell>();
        for (let i = 0; i < this.rows; i++) {
            cells.push(this.board.getCell(i, column));
        }

        cells.reverse();

        // get the first cell that is not alive
        let cellToPlay = cells.find(cell => !cell.getIsAlive());
        if (cellToPlay) {
            cellToPlay.setPlayer(player);
            cellToPlay.setIsAlive(true);

            if (this.hasWon(cellToPlay)) {
                alert('Player ' + player.getColor() + ' gagné');
            } else if (this.isWithDraw()) {
                alert('Match nul');
            } else {
                this.switchPlayerTurn();
            }

        } else {
            console.log(`Column ${column + 1} is full`);
        }

    }

    private hasWon(cell: Cell): boolean {
        let player = cell.getPlayer();
        let row = cell.getRow();
        let column = cell.getColumn();
        let alignements = 0;

        // check horizontal
        for (let i = 0; i < this.columns; i++) {
            if (this.board.getCell(row, i).getPlayer() === player) {
                alignements++;
                if (alignements === this.alignementsToWin) {
                    this.gameOver = true;
                    return true;
                }
            } else {
                alignements = 0;
            }
        }

        // check vertical
        alignements = 0;
        for (let i = 0; i < this.rows; i++) {
            if (this.board.getCell(i, column).getPlayer() === player) {
                alignements++;
                if (alignements === this.alignementsToWin) {
                    this.gameOver = true;
                    return true;
                }
            } else {
                alignements = 0;
            }
        }

        // check diagonal
        alignements = 0;
        let rowOffset = row - column;
        for (let i = 0; i < this.rows; i++) {
            let j = i - rowOffset;
            if (j >= 0 && j < this.columns) {
                if (this.board.getCell(i, j).getPlayer() === player) {
                    alignements++;
                    if (alignements === this.alignementsToWin) {
                        this.gameOver = true;
                        return true;
                    }
                } else {
                    alignements = 0;
                }
            }
        }

        // check anti-diagonal
        alignements = 0;
        rowOffset = row + column;
        for (let i = 0; i < this.rows; i++) {
            let j = rowOffset - i;
            if (j >= 0 && j < this.columns) {
                if (this.board.getCell(i, j).getPlayer() === player) {
                    alignements++;
                    if (alignements === this.alignementsToWin) {
                        this.gameOver = true;
                        return true;
                    }
                } else {
                    alignements = 0;
                }
            }
        }

        return false;
    }

    public switchPlayerTurn(): void {
        this.playerTurn = this.playerTurn.getOpponent();
    }

}