<script setup>
  const props = defineProps(['item']);
</script>

<template>
    <div>
      <img :src="item.image_url" alt="product" class="product-image">
      <p>{{ item.name }}</p>
      <p>{{ item.qty }}</p>
      <p>{{ item.price }}</p>
      <p>{{ (item.price * item.qty).toFixed(2) }}</p>
    </div>
</template>

<style scoped>
.product-image {
  width: 10rem;
}
</style>
