<script setup lang="ts">
interface GameCountdownProps {
  time: number
}

const {time} = defineProps<GameCountdownProps>();
</script>


<template>
  <div class="GameCountdown">
    {{ time ? time : '∞' }}
  </div>
</template>


<style lang="scss" scoped>
.GameCountdown {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #FFFFFF;
  align-items: flex-start;
  padding: 6px;
  gap: 10px;
  background: #272727;
  border-radius: 2px;
}
</style>