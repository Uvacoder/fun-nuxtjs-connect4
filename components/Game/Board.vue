<script lang="ts" setup>
import Board from "~/engine/Board";

interface BoardProps {
  board: Board
}

const {board} = defineProps<BoardProps>();

const emit = defineEmits(['play']);

const getGridTemplate = (repeatValue: number) => {
  return `repeat(${repeatValue}, 1fr)`;
}

const playColumn = (column: number) => {
  console.log('play column', column);
  emit('play', column);
}

</script>

<template>
  <div class="Board">
    <div :style="{gridTemplateColumns: getGridTemplate(board.getColumns())}" class="BoardColumns">
      <div v-for="column in board.getGrid()" :style="{gridTemplateRows: getGridTemplate(board.getRows())}"
           class="BoardRows">
        <div v-for="cell in column" class="BoardCell" @click="playColumn(cell.getColumn())">
          <div class="BoardCellContent" :style="{backgroundColor: cell.getPlayer()?.getColor() }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Board {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: fit-content;
  background: var(--grid-bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--border-primary);

  &Rows {
    display: grid;
    gap: 10px;
    padding: 10px 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: var(--bg-secondary)
    }
  }

  &Columns {
    display: grid;

  }

  &Cell {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &Content {
      width: 100px;
      height: 100px;
      background: var(--bg-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      outline: none;

    }
  }
}
</style>