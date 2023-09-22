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
    <div class="product-card" v-for="item of items">
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
  .container {
    margin-top: 2em;
  }

  .product-image {
    width: 15rem;
  }

  p {
    margin: 1em 0 1em 0;
    font-size: 1.3rem;
  }

  .name {
    font-size: 1.8rem;
  }

  .order-total {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .container {
    display: flex;
    flex-direction: column;
    margin-inline: 10rem;
  }

  .product-card {
    display: flex;
    margin: 1em 0 2em 0;
    gap: 10em;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5);
  }

  @media screen and (max-width: 75em) {
    .product-image {
      width: 13rem;
    }

    .container {
      margin: 2em 5em 3em 5em;
    }
  }

  @media screen and (max-width: 62.5em) {
    .product-image {
      width: 10rem;
    }

    .product-card {
      gap: 5em;
    }

    p {
      font-size: 1.1rem;
    }

    .name {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 50em) {
    .container {
      margin: 2em 3em 3em 3em;
    }
  }

  @media screen and (max-width: 37.5em) {
    p {
      font-size: .9rem;
    }

    .name {
      font-size: 1.1rem;
    }

    .product-card {
      gap: 3em;
    }

    .product-image {
      width: 8rem;
    }
  }

  @media screen and (max-width: 30em) {
    .container {
      margin: 2em 1.5em 3em 1.5em;
    }
  }
</style>
