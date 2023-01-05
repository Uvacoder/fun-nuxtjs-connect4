<script setup lang="ts">

import Connect4 from "~/engine/Connect4";
import Player from "~/engine/Player";

const player1 = new Player('1', "Player 1", "RED", 0, 0, true, true, true);
const player2 = new Player('2', "Player 2", "YELLOW", 0, 0, true, false, false);
const puissance4 = new Connect4([player1, player2],6, 7, 4, 300);

</script>

<template>
  <div class="GamePlay">
    <pre>
    {{ puissance4 }}
      </pre>
  </div>
</template>


<style lang="scss" scoped>
.GamePlay {
}
</style>