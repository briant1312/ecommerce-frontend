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
    margin-top: 2em;
    padding: 1em 3em;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5);
    cursor: pointer;
    font-size: 1.2rem;
  }
</style>
