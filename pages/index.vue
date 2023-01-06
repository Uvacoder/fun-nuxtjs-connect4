<script lang="ts" setup>

import Avatar from "~/components/User/Avatar.vue";
import SocialProviderButton from "~/components/Button/SocialProviderButton.vue";

const client = useSupabaseClient()
const user = useSupabaseUser()

const {data, pending, refresh} = await useAsyncData('game', async () => {
  const {data} = await client.from('game_status').select('key, name')
  return data
})

const createGame = async () => {
  const status: any = 1
  const {data, error} = await client.from('game').insert({status})
  if (error) {
    console.log(error)
  }
  if (data) {
    console.log(data)
  }
}

</script>

<template>

  <div v-if="user" style="display: flex; align-items: center; justify-content: flex-start; margin: 0 10px; gap: 15px;">
    <Avatar :src="user.user_metadata.avatar_url" size="medium" alt="Avatar"/>
    <h1>Welcome {{ user.user_metadata.full_name }} <small>({{ user.email }})</small></h1>
  </div>
  {{ user }}

  Status : ({{ pending ? 'loading' : 'loaded' }})
  {{ data }}

  <button @click="refresh">Refresh</button>

  <div style="display: flex; flex-direction: column; gap: 10px;">
    <SocialProviderButton provider="github"/>
    <SocialProviderButton provider="google"/>
  </div>

  <br/>

  <!-- login with github -->
  <button v-if="!user" @click="client.auth.signInWithOAuth({ provider: 'github' })">Sign in</button>
  <button v-else @click="client.auth.signOut()">Sign out</button>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');

body {

  font-family: 'Manrope', sans-serif;
  background: var(--bg-primary);
  color: var(--primary);
}
</style>
