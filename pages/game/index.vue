<script setup lang="ts">

import Connect4 from "~/engine/Connect4";
import Player from "~/engine/Player";
import {Ref} from "vue";
import Board from "~/components/Game/Board.vue";
definePageMeta({layout: 'game-layout'})

enum PlayerColors {
  RED = '#a42c2c',
  YELLOW = '#a4902c',
  BLUE = '#2c4ea4',
  GREEN = '#4aa42c',
}

const player1 = new Player('1', "Player 1", PlayerColors.RED, 0, 0, true, true);
const player2 = new Player('2', "Player 2", PlayerColors.YELLOW, 0, 0, true, false);

const {connectFour} = useConnectFour([player1, player2], 6,7, 4, 300);

</script>

<template>
  <ClientOnly>
    <div class="GamePlay">
      Player turn : {{ connectFour.getCurrentPlayer().getName() }}
      <Board :board="connectFour.board" @play="connectFour.playToken($event)"/>
    </div>
  </ClientOnly>
</template>


<style lang="scss" scoped>
.GamePlay {
  color: white;
}
</style>