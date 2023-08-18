<script setup>
  import { useRouter } from 'vue-router';
  import ProductList from "../components/ProductList.vue"

  const router = useRouter();

  const props = defineProps(['category'])

  const categories = {
    "hats": 1,
    "shirts": 2,
    "hoodies": 3,
    "jackets": 4,
    "shoes": 5,
  }
  
  if (!Object.keys(categories).includes(props.category)) {
    router.push({name: "notfound"})
  }
</script>

<template>
  <ProductList :category="categories[category]"/>
</template>

<style scoped>

</style>
