<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <h1>Merch</h1>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/">Hats</RouterLink>
    <RouterLink to="/">Shirts</RouterLink>
    <RouterLink to="/">Hoodies</RouterLink>
    <RouterLink to="/">Jackets</RouterLink>
    <RouterLink to="/">Shoes</RouterLink>
  </nav>
</template>

<style>
  nav {
    display: flex;
    justify-content: space-around;
    background-color: white;
    padding: 2.5em 0 2.5em 0;
    position: sticky;
    top: 0;
  }

  nav a {
    color: black;
    text-decoration: none;
    font-size: 1.9rem;
    text-transform: uppercase;
  }

  h1 {
    text-align: center;
    font-size: 3.4rem;
  }
</style>
