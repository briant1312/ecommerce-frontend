<script setup>
  import { RouterView } from 'vue-router'
  import { ref, provide, watch } from 'vue';
  import Navbar from './components/Navbar.vue';
  import { getUser } from './utilities/user';
  import { getCart } from './utilities/orders'

  const user = ref(getUser());
  const cartId = ref(null);

  function updateUser(userInfo) {
    user.value = userInfo;
  }

  async function updateCartId() {
    if (user.value) {
      try {
        const userCartId = await getCart();
        cartId.value = userCartId.id;
      } catch {
        return;
      }
    } else {
      cartId.value = null;
    }
  }

  provide('user', {
    user,
    updateUser
  })

  provide('cart', {
    cartId,
    updateCartId
  })

  updateCartId()
   
  watch(user, async () => {
    updateCartId();
  })
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>
</style>
