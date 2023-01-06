<script setup lang="ts">
import Player from "~/engine/Player";

interface GameAvatarProps {
  player: Player
  alignment: 'left' | 'right',
  active: boolean
}

const {player, alignment, active} = withDefaults(defineProps<GameAvatarProps>(), {
  alignment: 'left',
});

const getPlayerColor = computed(() => {
  return player.getColor();
})


</script>

<template>
  <div class="GameUserPane" :class="{'GameUserPaneActive': active}">
    <GameAvatar :alt="player.getName()" :src="player.getAvatar()" :color="player.getColor()"/>
    {{ player.getName()}} {{ active }}
    <GameCountdown :time="player.getTimeLeft()"/>
  </div>
</template>

<style lang="scss" scoped>
.GameUserPane {
  border: 1px solid var(--bg-secondary);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;

  &Active {
    border: 1px solid v-bind(getPlayerColor)
  }
}
</style>