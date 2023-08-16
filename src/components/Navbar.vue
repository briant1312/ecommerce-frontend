<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <h1>Merch</h1>
  <nav>
    <!-- there is an array inside of the Category.vue file that looks for these  -->
    <!--  specific names. If you add something or change the name inside of the to= field -->
    <!-- you will need to update that array otherwise you will get a 404 -->
    <RouterLink to="/">home</RouterLink>
    <RouterLink to="/hats">hats</RouterLink>
    <RouterLink to="/shirts">shirts</RouterLink>
    <RouterLink to="/hoodies">hoodies</RouterLink>
    <RouterLink to="/jackets">jackets</RouterLink>
    <RouterLink to="/shoes">shoes</RouterLink>
  </nav>
</template>

<style>
  nav {
    display: flex;
    justify-content: space-around;
    background-color: white;
    padding: 2em 0 2em 0;
    position: sticky;
    top: 0;
  }

  nav a {
    color: black;
    text-decoration: none;
    font-size: 1.3rem;
    text-transform: uppercase;
  }

  h1 {
    text-align: center;
  }
</style>
