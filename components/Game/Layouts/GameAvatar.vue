<script setup lang="ts">
interface GameAvatarProps {
  src: string,
  alt: string,
  color: string,
}

const {src} = defineProps<GameAvatarProps>();

</script>

<template>
  <div class="GameAvatar" :style="{border: `2px solid ${color}`, color: color}">
    <img :src="src" :alt="`${alt}'s Avatar`" v-if="src"/>
    <Icon name="ph:user-bold" v-else/>
  </div>
</template>

<style lang="scss" scoped>
.GameAvatar {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 10px;
  font-size: 20px;
  border-radius: 50px;
  width: 40px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>