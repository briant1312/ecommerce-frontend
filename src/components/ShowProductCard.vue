<script setup>
  import * as itemApi from "../utilities/items.js";
  import { inject, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { addItemToCart } from "../utilities/orders"
  
  const router = useRouter();
  const props = defineProps(['id']);

  const data = ref({});
  const orderQty = ref(1);
  const { cartId, updateTotalItems } = inject("cart");
  const { user } = inject("user");

  function validateOrderQty() {
    if (orderQty.value > 100) {
      orderQty.value = 100;
    } else if (orderQty.value < 1) {
      orderQty.value = 1;
    }
  }
  
  async function getData() {
    try {
      const res = await itemApi.show(props.id);
      if (!res) {
        router.push({ name: "notfound" });
        return;
      }
      data.value = res;
    } catch {
      router.push({ name: "notfound" });
    }
  }
  getData();

  async function addToCart() {
    await addItemToCart(cartId.value, data.value.id, orderQty.value);
    await updateTotalItems();
  }
</script>

<template>
  <div class="show-card">
    <div class="image-container">
      <img :src="data.image_url" alt="product">
    </div>
    <div class="product-info">
      <h2>{{ data.name }}</h2>
      <p>${{ data.price }}</p>
      <p>{{ data.description }}</p>
      <button @click="addToCart" :class="{ disabled: !user }">Add to cart</button>
      <input @change="validateOrderQty()" v-model.number="orderQty" type="number" min="1" :max="100">
      <div v-if="!user" class="tooltip">Login to add</div>
    </div> 
  </div>
</template>

<style scoped>
  .show-card {
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 3rem 5rem;
  }
  
  .product-info {
    padding: 2em 6em;
  }

  input {
    width: 2.8em;
    font-size: 1.2rem;
    padding: .5em 0 .5em .2em;
  }

  .product-info p {
    font-size: 1.5rem;
    margin-bottom: 2em;
  }

  .product-info h2 {
    font-size: 2.5rem;
    margin-bottom: 1em;
  }

  button {
    font-size: 1.2rem;
    color: white;
    background-color: #1E1E26;
    cursor: pointer;
    padding: .6em;
    transition: all .2s;
    border: none;
  }

  button:hover {
    background-color: #37374A;
  }
  
  .disabled {
    background-color: rgba(30,30,38,.3); 
    cursor: auto;
  }

  .disabled:hover {
    background-color: rgba(30,30,38,.3); 
  }

  .tooltip {
    opacity: 0;
    transform: translateY(-.5em);
    transition: all .2s;
    pointer-events: none;
  }

  button:hover ~ .tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  .image-container img {
    width: 100%;
  }
</style>
