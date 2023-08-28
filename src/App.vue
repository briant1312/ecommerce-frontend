<script setup>
  import { RouterView } from 'vue-router'
  import { ref, provide, watch } from 'vue';
  import Navbar from './components/Navbar.vue';
  import { getUser } from './utilities/user';
  import { getCart, getOrderCount } from './utilities/orders'

  const user = ref(getUser());
  const cartId = ref(null);
  const totalItems = ref(0);

  function updateUser(userInfo) {
    user.value = userInfo;
  }

  async function updateTotalItems(newCount=null) {
    if (newCount !== null) {
      totalItems.value = newCount;
      return;
    }
    if (!cartId.value) {
      return;
    }
    
    const count = await getOrderCount(cartId.value);
    if (!count) return;
    totalItems.value = count;
  }

  async function updateCartId() {
    if (user.value) {
      try {
        const userCartId = await getCart();
        cartId.value = userCartId.id;
        await updateTotalItems();
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
    updateCartId,
    totalItems,
    updateTotalItems,
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
