<script setup>
  import { inject, ref, watch } from 'vue';
  import { getItems, completeOrder } from "../utilities/orders"
  import CheckoutListItem from './CheckoutListItem.vue';

  const orderItems = ref([]);
  const { cartId, updateCartId } = inject("cart");
  const { user } = inject("user");
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
  <h2 v-if="orderItems.length < 1 && user">There are currently no items in your cart</h2>
  <h2 v-else-if="!user">Please login to use cart</h2>
  <CheckoutListItem @fetch-data="getData" v-for="item of orderItems" :item="item" :key="item.id"/>
  <p class="order-total">Order Total: ${{ orderTotal.toFixed(2) }}</p>
  <button v-if="orderItems.length > 0" @click="checkoutOrder">Checkout</button>
</template>

<style scoped>
  .order-total {
    margin-left: 10rem;
    font-size: 1.3rem;
    margin-bottom: 1em;
    font-weight: bold;
  }

  button {
    margin-left: 10rem;
    font-size: 1.2rem;
    color: white;
    background-color: #1E1E26;
    cursor: pointer;
    padding: .5em;
    transition: all .2s;
  }

  button:hover {
    background-color: #2E2E3D;
  }

  h2 {
    margin-top: 2em;
    margin-bottom: 2em;
    text-align: center;
    color: #636865
  }
</style>
