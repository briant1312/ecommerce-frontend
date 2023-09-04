<script setup>
  import { ref } from 'vue';
  import { getCompletedOrders } from '../utilities/orders';
  import OrderListItem from './OrderListItem.vue';
  
  const orders = ref([]);

  async function getOrders() {
    const allOrders = await getCompletedOrders(); 
    orders.value = allOrders;
  }
  getOrders();
</script>

<template>
  <div class="order-list-container">
    <OrderListItem v-for="order of orders" :order="order"/> 
  </div>
</template>

<style scoped>
  .order-list-container {
    display: flex;
    flex-direction: column;
    margin-inline: 10rem;
  }
</style>
