<script setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const props = defineProps({
    category: String
  })

  const validCategories = [
    'hats',
    'shirts',
    'hoodies',
    'jackets',
    'shoes'
  ]

  if (!validCategories.includes(props.category)) {
    router.push({name: "notfound"})
  }
</script>

<template>
  <div>{{ category }}</div>
</template>

<style scoped>

</style>
