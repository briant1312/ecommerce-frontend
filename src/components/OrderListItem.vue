<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const props = defineProps(['order']);
</script>

<template>
  <div class="order-container" @click="router.push(`/order/${order.id}`)">
    <p>Order Id: {{order.id}}</p>
    <p>Total Items: {{order.total_items}}</p>
    <p>Order Total: {{order.total_price}}</p>
  </div>
</template>

<style scoped>
  .order-container {
    border: 1px solid red;
    padding: 1em 3em;
    cursor: pointer;
  }
</style>
