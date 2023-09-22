<script setup>
  import { inject, ref } from 'vue';
  import { removeItemFromCart, addItemToCart } from "../utilities/orders";

  const props = defineProps(['item']);
  const emits = defineEmits(['fetchData']);
  const orderQty = ref(props.item.qty);
  const { cartId, updateTotalItems } = inject("cart");

  async function removeFromCart() {
    await removeItemFromCart(cartId.value, props.item.id, props.item.qty);
    await updateTotalItems();
    emits('fetchData');
  }

  async function adjustItemQty() {
    if (orderQty.value <= 0) return;

    if (orderQty.value < props.item.qty) {
      const removeQty = props.item.qty - orderQty.value;
      await removeItemFromCart(cartId.value, props.item.id, removeQty);
      await updateTotalItems();
      emits('fetchData');
    } else {
      const addQty = orderQty.value - props.item.qty;
      await addItemToCart(cartId.value, props.item.id, addQty);
      await updateTotalItems();
      emits('fetchData');
    }
  }
</script>

<template>
  <div class="product-card">
    <img :src="item.image_url" alt="product" class="product-image">
    <div class="product-info">
      <p class="name">{{ item.name }}</p>
      <p class="qty">qty: {{ item.qty }}</p>
      <p class="price-per">${{ item.price }} each</p>
      <p class="line-price">total price: ${{ (item.price * item.qty).toFixed(2) }}</p>
    </div>
    <div class="button-container">
      <button class="remove-item" @click="removeFromCart">Remove</button>
      <div class="adjust-qty-container">
        <input v-model.number="orderQty" type="number" min="1" max="100">
        <button @click="adjustItemQty">Adjust Qty</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .product-card {
    display: flex;
    margin: 2em 10em 3em 10em;
    gap: 8em;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5);
    background-color: white;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: auto;
    margin-right: 3em;
    flex-shrink: 0;
  }

  .product-info {
    padding-top: 3.5em;
  }

  input {
    width: 2.8em;
    font-size: 1.2rem;
    padding: .5em 0 .5em .2em;
  }

  button {
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

  p {
    font-size: 1.3rem;
    margin-bottom: 1em;
  }

  .name {
    font-size: 1.8rem;
  }

  .product-image {
    width: 15rem;
  }

  @media screen and (max-width: 75em) {
    .product-image {
      width: 13rem;
    }

    .product-card {
      margin: 2em 5em 3em 5em;
      gap: 6em;
    }

    button {
      font-size: 1rem;
    }

    input {
      font-size: 1rem;
    }

    p {
      font-size: 1.1rem;
    }

    .name {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 62.5em) {
    .product-image {
      width: 10rem;
    }

    .product-card {
      margin: 2em;
    }

    .product-info {
      padding-top: 1em;
    }
  }

  @media screen and (max-width: 50em) {
    button {
      font-size: .8rem;
    }

    input {
      font-size: .8rem;
    }

    .product-card {
      gap: 2.5em;
    }
  }

  @media screen and (max-width: 37.5em) {
    .product-card {
      display: grid;
      grid-template-areas:
        "image info"
        "buttons buttons";
      grid-template-columns: 1fr 1fr;
      padding: 1em;
      gap: 1em;
    }

    .product-image {
      grid-area: image;
      width: 100%;
    }

    .product-info {
      grid-area: info;
    }

    .button-container {
      grid-area: buttons;
    }

    .button-container {
      flex-direction: row-reverse;
      justify-items: space-between;
      margin: 0;
    }
  }

  @media screen and (max-width: 30em) {
    p {
      font-size: .9rem;
    }

    .name {
      font-size: 1.1rem;
    }
  }
</style>
