<script lang="ts" setup>
interface AvatarProps {
  src: string;
  size: 'small' | 'medium' | 'large';
  alt: string;
}

const {src, size, alt} = withDefaults(defineProps<AvatarProps>(), {
  size: 'medium',
  alt: 'Avatar',
});

const getAvatarSize = computed(() => {
  switch (size) {
    case 'small':
      return 'AvatarSm';
    case 'medium':
      return 'AvatarMd';
    case 'large':
      return 'AvatarLg';
  }
});
</script>

<template>
  <div class="Avatar" :class="[getAvatarSize]">
    <img :src="src" :alt="alt"/>
  </div>
</template>

<style lang="scss" scoped>
.Avatar {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  box-shadow: 0 0 0 1px var(--border-primary);
  transition: all 0.2s ease-in-out;

  &Sm {
    width: 2rem;
    height: 2rem;
  }

  &Md {
    width: 3.5rem;
    height: 3.5rem;
  }

  &Lg {
    width: 5rem;
    height: 5rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>