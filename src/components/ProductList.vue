<script setup>
  import { ref, watch, toRefs } from 'vue';
  import * as itemApi from '../utilities/items.js'
  import ProductListItem from '../components/ProductListItem.vue';

  const props = defineProps({
    category: Number
  })


  const { category } = toRefs(props);
  const data = ref([]);

  async function getData() {
    const res = await itemApi.indexCategory(category.value);
    data.value = res;
  }

  getData();

  watch(category, () => {
    getData();
  })

</script>

<template>
  <div class="product-card-container">
    <ProductListItem v-for="item of data" :product="item"></ProductListItem>
  </div>
</template>

<style scoped>
  .product-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 3em;
    margin-top: 3em;
    justify-content: center;
  }

  @media screen and (max-width: 37.5em) {
    .product-card-container {
      gap: 1.5em;
    }
  }
</style>
