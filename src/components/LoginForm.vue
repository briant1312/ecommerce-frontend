<script setup>
  import { toRefs, watch, ref, inject } from 'vue';
  import * as userApi from "../utilities/user.js"
  const props = defineProps(['isVisible']);
  const emits = defineEmits(['closeModal']);

  const { isVisible } = toRefs(props);
  const username = ref("");
  const password = ref("");
  const errorMessage = ref("");
  const { updateUser } = inject("user");

  watch(isVisible, () => {
    if (isVisible.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  })

  async function handleSubmit() {
    if (!username || !password) {
      return;
    }

    const userObj = {
      username: username.value,
      password: password.value
    }

    try {
      const user = await userApi.login(userObj);
      updateUser(user);
      username.value = "";
      password.value = "";
      emits("closeModal");
    } catch (error) {
      errorMessage.value = error.message;
    }
  }
</script>

<template>
  <Teleport to="body">
    <div class="modal-background" v-if="isVisible" @click="$emit('closeModal')"></div>
    <form @submit.prevent="handleSubmit" class="login-form" v-if="isVisible">
      <span class="close" @click="$emit('closeModal')">&times</span>
      <label for="">username</label>
      <input v-model="username" type="text" placeholder="Enter Username">
      <label for="">password</label>
      <input v-model="password" type="password" placeholder="Enter Password">
      <p v-if="errorMessage.length">{{ errorMessage }}</p>
      <button>Login</button>
    </form>
  </Teleport>
</template>

<style scoped>
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    padding: 4em;
    flex-direction: column;
    background-color: lightgray;
    border-radius: 20px;
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: .5em;
    right: 1em;
    font-size: 1.5rem;
  }

  .modal-background {
    top: 0;
    left: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(30, 30, 30, .9);
    backdrop-filter: blur(3px);
  }
</style>
