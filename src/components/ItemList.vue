<script setup>
  import { defineProps, ref, watch, toRefs } from 'vue';
  import * as itemApi from '../utilities/items.js'

  const props = defineProps({
    category: Number
  })


  const { category } = toRefs(props);
  const data = ref([]);

  async function getData() {
    const response = await itemApi.indexCategory(category.value);
    data.value = response;
  }

  getData();

  watch(category, () => {
    getData();
  })

</script>

<template>
  <div v-for="item of data">{{ item.name }}</div>
</template>

<style scoped></style>
