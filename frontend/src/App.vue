<script setup>
import { ref, onMounted } from 'vue';
import Navigation from './components/Nav.vue';

import { supabase } from '../src/lib/supabase';
import Auth from './components/Auth.vue';

const session = ref();

onMounted(async () => {
  try {
    const { data } = await supabase.auth.getSession();
    session.value = data.session;

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session;
    });
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <div class="bg-white">
    <Navigation/>
  </div>

  <div class="container p-4 mx-auto">
    <div v-if="session">
      <router-view />
    </div>
    <div v-else>
      <Auth />
    </div>
  </div>

  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
