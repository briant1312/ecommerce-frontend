<script setup>
  import { ref } from 'vue';
  import { getItems } from '../utilities/orders';

  const props = defineProps(['orderId']);
  const items = ref([]);
  const orderTotal = ref(0);

  async function getData() {
    if (!props.orderId) return;

    const data = await getItems(props.orderId);
    items.value = data;
    orderTotal.value = 0;
    data.forEach(item => {
      let price = item.price * item.qty;
      orderTotal.value += price;
    })
  }
  getData();
</script>

<template>
  <div class="container">
    <div class="item" v-for="item of items">
      <img :src="item.image_url" alt="piece of clothing" class="product-image"/>
      <div class="product-info">
        <p class="name">{{ item.name }}</p>
        <p class="qty">qty: {{ item.qty }}</p>
        <p class="price-per">${{ item.price }} each</p>
        <p class="line-price">total price: ${{ (item.price * item.qty).toFixed(2) }}</p>
      </div>
    </div>
    <p class="order-total">Order Total: ${{ orderTotal.toFixed(2) }}</p>
  </div>
</template>

<style scoped>
  .product-image {
    width: 15rem;
  }

  p {
    font-size: 1.1rem;
  }

  .name {
    font-size: 1.5rem;
  }

  .order-total {
    font-size: 1.3rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    margin-inline: 10rem;
    gap: 3em;
  }

  .item {
    border: 1px solid red;
    padding: 1em;
    display: flex;
    gap: 10em;
  }
</style>
