<script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const props = defineProps(['product']);

  function showItem(id) {
    router.push(`/show/${id}`)
  }
</script>

<template>
  <div class="product-card" @click="showItem(product.id)">
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
    cursor: pointer;
  }

  .product-card p {
    font-size: 1.2rem;
  }

  .product-card img {
    width: 100%;
  }
</style>
