<script setup>
  import { inject, onMounted, ref } from 'vue';
  import { getItems } from "../utilities/orders"

  const orderItems = ref([]);
  const { cartId } = inject("cart");

  onMounted(async () => {
    const items = await(getItems(cartId.value));
    orderItems.value = items;
  })
</script>

<template>
  <div v-for="item of orderItems">
    <div>
      <img :src="item.image_url" alt="product" class="product-image">
      <p>{{ item.name }}</p>
      <p>{{ item.qty }}</p>
      <p>{{ item.price }}</p>
      <p>{{ (item.price * item.qty).toFixed(2) }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-image {
  width: 10rem;
}
</style>
