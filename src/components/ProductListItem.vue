<script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const props = defineProps(['product']);

  function showItem(id) {
    router.push(`/show/${id}`);
  }
</script>

<template>
  <div class="product-card" @click="showItem(product.id)">
    <img :src="product.image_url" alt="piece of clothing" />
    <p>{{ product.name }}</p>
    <p>${{ product.price }}</p>
  </div>
</template>

<style scoped>
  .product-card {
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5);
    width: 20vw;
    text-align: center;
    cursor: pointer;
    background-color: white;
  }

  .product-card p {
    font-size: 1.3rem;
    margin: 1em 0 1em 0;
  }

  .product-card img {
    width: 100%;
    aspect-ratio: 5 / 7;
    object-fit: cover;
    transform: translate3d(0px, 0px, 0.1px);
  }
</style>
