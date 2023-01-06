import Cell from "~/engine/Cell";
import Player from "~/engine/Player";

class Board {

    private readonly rows: number;
    private readonly columns: number;
    private readonly grid: Array<Array<Cell>>;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.grid = new Array<Array<Cell>>();
        this.initializeGrid();
    }

    private initializeGrid(): void {
        // when initialize grid, make arrays of columns containing rows of cells
        for (let column = 0; column < this.columns; column++) {
            this.grid[column] = new Array<Cell>();
            for (let row = 0; row < this.rows; row++) {
                this.grid[column][row] = new Cell(row, column);
            }
        }
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

    public isColumnFull(column: number): boolean {
        return this.getLowestEmptyRow(column) === -1;
    }

    public getLowestEmptyRow(column: number): number {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.grid[column][row].isOccupied()) {
                return row;
            }
        }
        return -1;
    }


}

export default Board;