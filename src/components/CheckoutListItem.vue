<script setup>
  import { inject, ref } from 'vue';
  import { removeItemFromCart, addItemToCart } from "../utilities/orders";

  const props = defineProps(['item']);
  const emits = defineEmits(['fetchData']);
  const orderQty = ref(props.item.qty);
  const { cartId, updateTotalItems } = inject("cart");

  async function removeFromCart() {
    await removeItemFromCart(cartId.value, props.item.id, props.item.qty);
    await updateTotalItems();
    emits('fetchData');
  }

  async function adjustItemQty() {
    if (orderQty.value <= 0) return;

    if (orderQty.value < props.item.qty) {
      const removeQty = props.item.qty - orderQty.value;
      await removeItemFromCart(cartId.value, props.item.id, removeQty);
      await updateTotalItems();
      emits('fetchData');
    } else {
      const addQty = orderQty.value - props.item.qty;
      await addItemToCart(cartId.value, props.item.id, addQty);
      await updateTotalItems();
      emits('fetchData');
    }
  }
</script>

<template>
  <div class="product-card">
    <img :src="item.image_url" alt="product" class="product-image">
    <div class="product-info">
      <p class="name">{{ item.name }}</p>
      <p class="qty">qty: {{ item.qty }}</p>
      <p class="price-per">${{ item.price }} each</p>
      <p class="line-price">total price: ${{ (item.price * item.qty).toFixed(2) }}</p>
    </div>
    <div class="button-container">
      <button class="remove-item" @click="removeFromCart">Remove All</button>
      <div class="adjust-qty-container">
        <input v-model.number="orderQty" type="number" min="1" max="100">
        <button @click="adjustItemQty">Adjust Qty</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid red;
  display: flex;
  margin-inline: 10em;
  margin-bottom: 2em;
  gap: 10em;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

p {
  font-size: 1.1rem;
}

.name {
  font-size: 1.5rem;
}

.product-image {
  width: 15rem;
}
</style>
