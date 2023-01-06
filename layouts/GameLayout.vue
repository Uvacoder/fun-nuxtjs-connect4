<script lang="ts" setup>

</script>

<template>
  <div class="GameLayout">
    <div class="GameLayoutHeader">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<style lang="scss">

html {
  background: var(--bg-primary);
}

.GameLayout {

  user-select: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;


  &Header {
    width: 100%;
    height: 65px;
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #282828;
  }
}
</style>