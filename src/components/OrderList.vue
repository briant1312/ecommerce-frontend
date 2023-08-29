<script setup>
  import { inject, ref, watch } from 'vue';
  import { getItems } from "../utilities/orders"
  import OrderListItem from './OrderListItem.vue';

  const orderItems = ref([]);
  const { cartId } = inject("cart");

  async function getData() {
    if (!cartId.value) return;
    
    const items = await(getItems(cartId.value));
    orderItems.value = items;
  }
  getData();

  watch(cartId, () => {
    getData();
  })
</script>

<template>
  <OrderListItem @fetch-data="getData" v-for="item of orderItems" :item="item"/>
</template>

<style scoped>
</style>
