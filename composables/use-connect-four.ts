import {ConnectFour} from "~/game/ConnectFour";
import {Cell} from "~/game/Cell";

export function useConnectFour(columns: number, rows: number, alignementsToWin: number) {
    const connectFour = ref<ConnectFour>(new ConnectFour(columns, rows, alignementsToWin));
    const playerTurn = computed(() => connectFour.value.getPlayerTurn());
    const getPlayerTurnColor = computed(() => playerTurn.value.getColor());
    const cellNeighbours = (cell: Cell) => connectFour.value.getCellNeighbours(cell);
    const cellNeighboursAlive = (cell: Cell) => connectFour.value.getCellNeighboursAlive(cell);
    const play = (row: number, column: number) => connectFour.value.playCell(row, column, playerTurn.value);
    const getCell = (row: number, column: number) => connectFour.value.getCell(row, column);
    const getColumns = () => connectFour.value.getColumns();
    const getRows = () => connectFour.value.getRows();
    const getAlignementsToWin = () => connectFour.value.getAlignementsToWin();
    const getGrid = () => connectFour.value.getBoard().getGrid();
    const reset = () => connectFour.value = new ConnectFour(columns, rows, alignementsToWin);

    const getGridTemplateColumns = () => {
        return `repeat(${columns}, 1fr)`;
    }

    const getGridTemplateRows = () => {
        return `repeat(${rows}, 1fr)`;
    }

    return {
        connectFour,
        playerTurn,
        cellNeighbours,
        cellNeighboursAlive,
        play,
        getCell,
        getColumns,
        getRows,
        getAlignementsToWin,
        getGrid,
        reset,
        getGridTemplateColumns,
        getGridTemplateRows,
        getPlayerTurnColor
    }
}