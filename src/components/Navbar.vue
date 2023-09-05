<script setup>
  import { useRouter } from 'vue-router';
  import { ref, inject } from 'vue';
  import LoginForm from "../components/LoginForm.vue"

  const router = useRouter();

  const userDropdownVisible = ref(false);
  const loginFormVisible = ref(false);
  const { user, updateUser } = inject("user");
  const { totalItems, updateTotalItems } = inject("cart");
  const isNewUser = ref(false);

  function closeForm() {
    loginFormVisible.value = false;
  }

  function updateIsNewUser() {
    isNewUser.value = !isNewUser.value;
  }

  function handleLoginButtonClick() {
    loginFormVisible.value = true;
    userDropdownVisible.value = false;
    isNewUser.value = false;
  }

  function handleSignupButtonClick() {
    loginFormVisible.value = true;
    userDropdownVisible.value = false;
    isNewUser.value = true;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    userDropdownVisible.value = false;
    updateTotalItems(0);
    updateUser(null);
    router.push({ name: "home"});
  }
</script>

<template>
  <LoginForm :isVisible="loginFormVisible" @update-is-new-user="updateIsNewUser" @close-modal="closeForm" :isNewUser="isNewUser"/>
  <div class="nav-header">
    <span class="title" @click="router.push({ name: 'home' })">Merch</span>
    <div class="user-icon" @mouseenter="userDropdownVisible = true" @mouseleave="userDropdownVisible = false">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div class="user-dropdown" v-if="userDropdownVisible && !user">
        <div @click="handleLoginButtonClick">Log In</div>
        <div @click="handleSignupButtonClick">Sign Up</div>
      </div>
      <div class="user-dropdown" v-else-if="userDropdownVisible">
        <div @click="router.push({ name: 'orders' })">Orders</div>
        <div @click="handleLogout" class="logout-button">Logout</div>
      </div>
    </div>
    <div @click="router.push({ name: 'checkout' })" class="cart-icon">
      <div class="cart-item-count" v-if="totalItems > 0">{{ totalItems }}</div>
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
    margin-right: .5em;
    padding-inline: 1em;
  }

  .cart-icon {
    cursor: pointer;
    margin-right: 4em;
    position: relative;
    color: black;
  }

  .cart-item-count {
    position: absolute;
    display: flex;
    background-color: #FC000A;
    border-radius: 50%;
    color: white;
    top: -.6em;
    right: -.6em;
    width: 1.2rem;
    height: 1.2rem;
    justify-content: center;
    align-items: center;
  }

  .user-dropdown {
    z-index: 10;
    border: 1px solid #A29B9C;
    position: absolute;
    top: 30px;
    left: -30px;
    width: 8rem;
    background-color: white;
  }

  .user-dropdown div {
    width: 100%;
    padding: .8em 0 .8em 0;
    cursor: pointer;
    text-align: center;
    font-size: 1.2rem;
  }

  .user-dropdown div:hover {
    background-color: #1E1E26;
    color: white;
  }

  .title {
    margin-left: 50%;
    transform: translateX(-50%);
    font-size: 3rem;
    font-weight: bold;
    cursor: pointer;
  }

  nav {
    display: flex;
    justify-content: space-around;
    background-color: white;
    padding: 2em 0 2em 0;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  nav a {
    color: black;
    text-decoration: none;
    font-size: 1.3rem;
    text-transform: uppercase;
  }
</style>
