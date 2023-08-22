<script setup>
  import { RouterView } from 'vue-router'
  import { ref, provide } from 'vue';
  import Navbar from './components/Navbar.vue';
  import { getUser } from './utilities/user';

  const user = ref(getUser());

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
