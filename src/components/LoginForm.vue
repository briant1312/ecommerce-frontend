<script setup>
  import { toRefs, watch, ref, inject } from 'vue';
  import * as userApi from "../utilities/user.js"
  const props = defineProps(['isVisible', 'isNewUser']);
  const emits = defineEmits(['closeModal', 'updateIsNewUser']);

  const { isVisible, isNewUser } = toRefs(props);
  const username = ref("");
  const password = ref("");
  const confirm = ref("");
  const errorMessage = ref("");
  const { updateUser } = inject("user");

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
      errorMessage.value = "";
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
      errorMessage.value = "";
      emits("closeModal");
    } catch (error) {
      errorMessage.value = error.message;
    }
  }

  function closeModal() {
    emits("closeModal");
      username.value = "";
      password.value = "";
      confirm.value = "";
      errorMessage.value = "";
  }

  function switchForm() {
    emits("updateIsNewUser");
      username.value = "";
      password.value = "";
      confirm.value = "";
      errorMessage.value = "";
  }
</script>

<template>
  <Teleport to="body">
    <div class="modal-background" v-if="isVisible" @click="closeModal"></div>
    <form @submit.prevent="handleLogin" class="login-form" v-if="isVisible && !isNewUser">
      <span class="close" @click="closeModal">&times</span>
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button>Login</button>
      <p v-if="errorMessage.length" class="error-message">{{ errorMessage }}</p>
      <p>Need an account?</p>
      <span class="sign-in" @click="switchForm">Sign Up</span>
    </form>
    <form @submit.prevent="handleSignup" class="signup-form" v-if="isVisible && isNewUser">
      <span class="close" @click="closeModal">&times</span>
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <input v-model="confirm" type="password" placeholder="Confirm Password" required>
      <button>Login</button>
      <p v-if="errorMessage.length" class="error-message">{{ errorMessage }}</p>
      <p>Already have an account?</p>
      <span class="sign-up" @click="switchForm">Sign In</span>
    </form>
  </Teleport>
</template>

<style scoped>
  .sign-in,
  .sign-up {
    cursor: pointer;
    color: #3E3F48;
    font-size: 1.1em;
    text-decoration: underline;
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
    background-color: #F6F7F9;
    border-radius: 5px;
    z-index: 10;
  }

  .login-form input,
  .signup-form input {
    padding: .5em;
    font-size: 1.2rem;
    margin-bottom: 1em;
    border: 1px solid black;
    background-color: transparent;
  }

  .login-form input::placeholder,
  .signup-form input::placeholder {
    color: #4B4B4B;
  }

  .login-form p,
  .signup-form p {
    font-size: 1.1em;
  }

  .login-form button,
  .signup-form button {
    margin-top: 1em;
    padding: .5em;
    font-size: 1.2rem;
    color: white;
    background-color: #1E1E26;
    cursor: pointer;
    transition: all .2s;
  }

  .login-form button:hover,
  .signup-form button:hover {
    background-color: #2E2E3D;
  }

  .error-message {
    margin-bottom: 0;
    color: #FD5C66
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: .2em;
    right: .5em;
    font-size: 2rem;
  }

  .modal-background {
    top: 0;
    left: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(30, 30, 30, .9);
    backdrop-filter: blur(3px);
    z-index: 2;
  }
</style>
