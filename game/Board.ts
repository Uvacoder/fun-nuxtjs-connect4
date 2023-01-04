import {Cell} from "~/game/Cell";
import {Player} from "~/game/Player";

export class Board {
    private readonly rows: number;
    private readonly columns: number;
    private readonly grid: Array<Array<Cell>>;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.grid = this.createGrid();
    }

    private createGrid(): Array<Array<Cell>> {
        let grid = new Array<Array<Cell>>();
        for (let row = 0; row < this.rows; row++) {
            grid[row] = new Array<Cell>();
            for (let column = 0; column < this.columns; column++) {
                grid[row][column] = new Cell(row, column, Player.NONE);
            }
        }
        return grid;
    }

    public getRows(): number {
        return this.rows;
    }

    public getColumns(): number {
        return this.columns;
    }

    public getGrid(): Array<Array<Cell>> {
        return this.grid;
    }

    public getCell(row: number, column: number): Cell {
        return this.grid[row][column];
    }


    public setCell(row: number, column: number, cell: Cell): void {
        this.grid[row][column] = cell;
    }

    public getCellNeighbours(cell: Cell): Array<Cell> {
        let neighbours = new Array<Cell>();
        let row = cell.getRow();
        let column = cell.getColumn();
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = column - 1; j <= column + 1; j++) {
                if (i >= 0 && i < this.rows && j >= 0 && j < this.columns && !(i == row && j == column)) {
                    neighbours.push(this.grid[i][j]);
                }
            }
        }
        return neighbours;
    }

    public getCellNeighboursAlive(cell: Cell): Array<Cell> {
        let neighbours = this.getCellNeighbours(cell);
        let neighboursAlive = new Array<Cell>();
        for (let neighbour of neighbours) {
            if (neighbour.getIsAlive()) {
                neighboursAlive.push(neighbour);
            }
        }
        return neighboursAlive;
    }

    public getCellNeighboursAliveCount(cell: Cell): number {
        return this.getCellNeighboursAlive(cell).length;
    }

    public getCellNeighboursAliveCountByPlayer(cell: Cell, player: Player): number {
        let neighboursAlive = this.getCellNeighboursAlive(cell);
        let neighboursAliveCount = 0;
        for (let neighbourAlive of neighboursAlive) {
            if (neighbourAlive.getPlayer() == player) {
                neighboursAliveCount++;
            }
        }
        return neighboursAliveCount;
    }

}


