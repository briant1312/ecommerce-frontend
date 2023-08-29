<script setup>
  import { inject, onMounted, ref } from 'vue';
  import { getItems } from "../utilities/orders"
  import OrderListItem from './OrderListItem.vue';

  const orderItems = ref([]);
  const { cartId } = inject("cart");

  onMounted(async () => {
    const items = await(getItems(cartId.value));
    orderItems.value = items;
  })
</script>

<template>
  <OrderListItem v-for="item of orderItems" :item="item"/>
</template>

<style scoped>
</style>
