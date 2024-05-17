<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
</script>

<template>
  <div :class="$style.root" >
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  flex: 1;
}
</style>
