<script setup>
  import { RouterView } from 'vue-router'
  import { ref, provide } from 'vue';
  import Navbar from './components/Navbar.vue';

  const user = ref(null);

  function updateUser(userInfo) {
    user.value = userInfo;
  }

  provide('user', {
    user,
    updateUser
  })
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>
</style>
