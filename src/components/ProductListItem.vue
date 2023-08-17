<script setup>
  import { defineProps } from 'vue';
  const props = defineProps(['product'])
</script>

<template>
  <div class="product-card">
    <img :src="product.image_url" alt="piece of clothing" />
    <p>{{ product.name }}</p>
    <p>{{ product.price }}</p>
  </div>
</template>

<style scoped>
  .product-card {
    border: 1px solid red;
    width: 20vw;
    text-align: center;
    padding: 1em 2em;
  }

  .product-card p {
    font-size: 1.2rem;
  }

  .product-card img {
    width: 100%;
  }
</style>
