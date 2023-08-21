<script setup>
  import { RouterLink } from 'vue-router';
  import { ref, inject } from 'vue';
  import LoginForm from "../components/LoginForm.vue"

  const userDropdownVisible = ref(false);
  const loginFormVisible = ref(false);
  const { user, updateUser } = inject("user");

  function closeForm() {
    loginFormVisible.value = false;
  }

  function handleLoginButtonClick() {
    loginFormVisible.value = true;
    userDropdownVisible.value = false;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    updateUser(null);
  }
</script>

<template>
  <LoginForm :isVisible="loginFormVisible" @close-modal="closeForm"/>
  <div class="nav-header">
    <span class="title">Merch</span>
    <div class="user-icon" @mouseenter="userDropdownVisible = true" @mouseleave="userDropdownVisible = false">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div class="user-dropdown" v-if="userDropdownVisible && !user">
        <button @click="handleLoginButtonClick">Log In</button>
      </div>
      <div class="user-dropdown" v-else-if="userDropdownVisible">
        <p>{{ user.username }}</p>
        <button @click="handleLogout">Logout</button>
      </div>
    </div>
    <div class="cart-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    </div>
  </div>
  <nav>
    <!-- there is an object inside of the Category.vue file that looks for these  -->
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

<style scoped>
  .nav-header {
    display: flex;
    align-items: center;
    padding: 2em 0 2em 0;
  }

  svg {
    width: 2em;
  }

  .user-icon {
    position: relative;
    cursor: pointer;
    margin-left: auto;
    margin-right: 1em;
  }

  .cart-icon {
    cursor: pointer;
    margin-right: 4em;
  }

  .user-dropdown {
    z-index: 10;
    border: 1px solid red;
    position: absolute;
    top: 30px;
    left: -20px;
    width: 4rem;
    padding: 1em;
  }

  .title {
    margin-left: calc(50% - 4rem);
    font-size: 3rem;
  }

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
</style>
