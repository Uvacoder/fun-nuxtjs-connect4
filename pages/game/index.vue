<script setup lang="ts">

import Connect4 from "~/engine/Connect4";
import Player from "~/engine/Player";
import Board from "~/components/Game/Board.vue";
import GameLayout from "~/layouts/GameLayout.vue";
import {Ref} from "vue";


enum PlayerColors {
  RED = '#934646',
  YELLOW = '#a1923f'
}

const player1 = new Player('1', "Player 1", PlayerColors.RED, 0, 0, true, true, true, 'https://avatars.githubusercontent.com/u/75085249?v=4');
const player2 = new Player('2', "Player 2", PlayerColors.YELLOW, 0, 0, true, false, false);

const {connectFour} = useConnectFour([player1, player2], 6, 7, 4, 300);

const isPlayerTurn = (player: Player) => {
  return connectFour.value.getCurrentPlayer() === player;
}
</script>

<template>
  <GameLayout>
    <template v-slot:header>
      <GameUserPane v-for="player in connectFour.getPlayers()" :key="player.getId()" :player="player"
                    :currentPlayer="isPlayerTurn(player)"/>

    </template>
    <ClientOnly>
      <div class="GamePlay">
        <Board :board="connectFour.board" @play="connectFour.playToken($event)"/>
      </div>
    </ClientOnly>
  </GameLayout>
</template>


<style lang="scss" scoped>
.GamePlay {
  color: white;
}
</style>