<script setup>
  import { inject, ref, watch } from 'vue';
  import { getItems } from "../utilities/orders"
  import OrderListItem from './OrderListItem.vue';

  const orderItems = ref([]);
  const { cartId } = inject("cart");
  const orderTotal = ref(0);

  async function getData() {
    if (!cartId.value) return;
    
    const items = await(getItems(cartId.value));
    orderItems.value = items;
    orderTotal.value = 0;
    items.forEach(item => {
      let price = item.price * item.qty;
      orderTotal.value += price;
    })
  }
  getData();

  watch(cartId, () => {
    getData();
  })
</script>

<template>
  <OrderListItem @fetch-data="getData" v-for="item of orderItems" :item="item"/>
  <p class="order-total">Order Total: ${{ orderTotal.toFixed(2) }}</p>
  <button>Checkout</button>
</template>

<style scoped>
.order-total {
  margin-left: 10rem;
  font-size: 1.3rem;
}

button {
  margin-left: 10rem;
}
</style>
