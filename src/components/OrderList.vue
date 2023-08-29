<script setup>
  import { inject, ref, watch } from 'vue';
  import { getItems, completeOrder } from "../utilities/orders"
  import OrderListItem from './OrderListItem.vue';

  const orderItems = ref([]);
  const { cartId, updateCartId } = inject("cart");
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

  async function checkoutOrder() {
    await completeOrder(cartId.value);
    await updateCartId();
  }
</script>

<template>
  <OrderListItem @fetch-data="getData" v-for="item of orderItems" :item="item"/>
  <p class="order-total">Order Total: ${{ orderTotal.toFixed(2) }}</p>
  <button v-if="orderItems.length > 0" @click="checkoutOrder">Checkout</button>
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
