<script lang="ts" setup>

definePageMeta({layout: 'game-layout'})
const game = useConnectFour(7, 6, 4);

</script>

<template>
  <ClientOnly>

    <div class="GameActivity">
      Au tour du : {{ game.getPlayerTurnColor }}
    </div>

    <div class="Game">
      <div :style="{gridTemplateRows: game.getGridTemplateRows()}" class="GameRows">
        <div v-for="row in game.getGrid()" :style="{gridTemplateColumns: game.getGridTemplateColumns()}"
             class="GameColumns">
          <div v-for="cell in row" class="GameCell">
            <div class="GameCellContent" :style="{backgroundColor: cell.getPlayer().getColor() }"
                 @click="game.play(cell.getRow(), cell.getColumn())">
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.Game {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: fit-content;
  background: var(--grid-bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 0 0 1px var(--border-primary);

  &Rows {
    display: grid;
    gap: 10px;
  }

  &Columns {
    display: grid;
    gap: 10px;
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