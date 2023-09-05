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
  <h2 v-if="orders.length < 1">You don't have any completed orders</h2>
  <div class="order-list-container">
    <OrderListItem v-for="order of orders" :order="order"/> 
  </div>
</template>

<style scoped>
  h2 {
    margin-top: 2em;
    margin-bottom: 2em;
    text-align: center;
    color: #636865
  }

  .order-list-container {
    display: flex;
    flex-direction: column;
    margin-inline: 10rem;
  }
</style>
