<script lang="ts" setup>

const client = useSupabaseClient()

interface SocialProviderButtonProps {
  provider: 'github' | 'google' | 'facebook';
}

const {provider} = defineProps<SocialProviderButtonProps>();

const providersIcons = {
  github: {name: 'Github', logo: 'mdi:github'},
  google: {name: 'Google', logo: 'logos:google-icon'},
  facebook: {name: 'Facebook', logo: 'logos:facebook'},
};

const loginWithProvider = () => {
  client.auth.signInWithOAuth({provider});
};


</script>

<template>
  <button class="SocialProviderButton" @click="loginWithProvider">
    <Icon :name="providersIcons[provider].logo"/>
    {{ providersIcons[provider].name }}
  </button>
</template>

<style lang="scss" scoped>
.SocialProviderButton {
  color: white;
  font-size: 16px;
  display: flex;
  width: 400px;
  background: transparent;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid #3e3e3e;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  > svg {
    font-size: 18px;
  }

  &:hover {
    background: #3e3e3e;
  }
}
</style>