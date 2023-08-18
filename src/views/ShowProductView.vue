<script setup>
  import { toRefs } from 'vue';
  import ShowProductCard from '../components/ShowProductCard.vue';
  const props = defineProps(['id']);

  const { id } = toRefs(props);
</script>
 
<template>
  <ShowProductCard :id="id"/>
</template>

<style scoped>
</style>
