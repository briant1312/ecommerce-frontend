<script setup>
  import * as itemApi from "../utilities/items.js";
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const props = defineProps(['id']);

  const data = ref({});
  const orderQty = ref(1);

  function validateOrderQty() {
    if (orderQty.value > data.value.qty) {
      orderQty.value = data.value.qty;
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
      <p>qty in stock: {{ data.qty }}</p>
      <button>Add to cart</button>
      <input @change="validateOrderQty()" v-model.number="orderQty" type="number" min="1" :max="data.qty">
    </div> 
  </div>
</template>

<style scoped>
  .show-card {
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: 3rem;
  }

  .product-info {
    padding: 2em;
  }

  input {
    width: 2.5rem;
  }

  .product-info p {
    font-size: 1.2rem;
  }

  .product-info h2 {
    font-size: 2rem;
  }

  .show-card > * {
    border: 1px solid red;
  }

  .image-container img {
    width: 100%;
  }
</style>
