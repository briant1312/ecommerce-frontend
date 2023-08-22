<script setup>
  import { toRefs, watch, ref, inject } from 'vue';
  import * as userApi from "../utilities/user.js"
  const props = defineProps(['isVisible']);
  const emits = defineEmits(['closeModal']);

  const { isVisible } = toRefs(props);
  const username = ref("");
  const password = ref("");
  const confirm = ref("");
  const errorMessage = ref("");
  const { updateUser } = inject("user");
  const signIn = ref(false);

  watch(isVisible, () => {
    if (isVisible.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  })

  async function handleLogin() {
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

  async function handleSignup() {
    if (password.value !== confirm.value) {
      errorMessage.value = "Passwords do not match"
      return;
    }

    const userObj = {
      username: username.value,
      password: password.value
    }

    try {
      const user = await userApi.signup(userObj);
      updateUser(user);
      username.value = "";
      password.value = "";
      confirm.value = "";
      emits("closeModal");
    } catch (error) {
      errorMessage.value = error.message;
    }
  }
</script>

<template>
  <Teleport to="body">
    <div class="modal-background" v-if="isVisible" @click="$emit('closeModal')"></div>
    <form @submit.prevent="handleLogin" class="login-form" v-if="isVisible && !signIn">
      <span class="close" @click="$emit('closeModal')">&times</span>
      <label for="">username</label>
      <input v-model="username" type="text" placeholder="Enter Username" required>
      <label for="">password</label>
      <input v-model="password" type="password" placeholder="Enter Password" required>
      <p v-if="errorMessage.length">{{ errorMessage }}</p>
      <button>Login</button>
      <p>Need an account?</p>
      <span class="sign-in" @click="signIn = true">Sign Up</span>
    </form>
    <form @submit.prevent="handleSignup" class="signup-form" v-if="isVisible && signIn">
      <span class="close" @click="$emit('closeModal')">&times</span>
      <label for="">username</label>
      <input v-model="username" type="text" placeholder="Enter Username" required>
      <label for="">password</label>
      <input v-model="password" type="password" placeholder="Enter Password" required>
      <label for="">confirm</label>
      <input v-model="confirm" type="password" placeholder="Re-Enter Password" required>
      <p v-if="errorMessage.length">{{ errorMessage }}</p>
      <button>Login</button>
      <p>Already have an account?</p>
      <span class="sign-up" @click="signIn = false">Sign In</span>
    </form>
  </Teleport>
</template>

<style scoped>
  .sign-in,
  .sign-up {
    cursor: pointer;
    color: blue;
  }

  .login-form,
  .signup-form {
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
