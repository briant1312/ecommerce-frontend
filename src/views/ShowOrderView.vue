<script setup>
  import { ref } from 'vue';
  import { getItems } from '../utilities/orders';

  const props = defineProps(['orderId']);
  const items = ref([]);

  async function getData() {
    if (!props.orderId) return;

    const data = await getItems(props.orderId);
    items.value = data;
  }
  getData();
</script>

<template>
  <div class="container">
    <div class="item" v-for="item of items">
      <p>{{ item.name }}</p>
      <p>qty: {{ item.qty }}</p>
      <p>{{ item.price }} each</p>
      <p>total price: {{ (item.price * item.qty).toFixed(2) }}</p>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    margin-inline: 10rem;
    gap: 3em;
  }

  .item {
    border: 1px solid red;
    padding: 1em;
  }
</style>
