<template>
  <h3 class="mt-5">Account Information</h3>
  <form @submit.prevent="infoSubmit">
    <div class="mb-3">
      <label>First Name</label>
      <input v-model="info.first_name" class="form-control" name="first_name" id="first_name">
    </div>
    <div class="mb-3">
      <label>Last Name</label>
      <input v-model="info.last_name" class="form-control" name="last_name" id="last_name">
    </div>
    <div class="mb-3">
      <label>Email</label>
      <input v-model="info.email" class="form-control" name="email" id="email">
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
  <h3 class="mt-5">Change Password</h3>
  <form @submit.prevent="passwordSubmit">
    <div class="mb-3">
      <label>Password</label>
      <input v-model="password.password" class="form-control" name="password" id="password">
    </div>
    <div class="mb-3">
      <label>Confirm Password</label>
      <input v-model="password.password_confirm" class="form-control" name="password_confirm" id="password_confirm">
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang='ts'>
import {defineComponent, onMounted, reactive} from 'vue'
import axios from "axios";
import {useStore} from "vuex";

export default defineComponent({
  name: 'ProfileEdit',
  setup() {
    const info = reactive({
      first_name: '',
      last_name: '',
      email: ''
    })

    const password = reactive({
      password: '',
      password_confirm: ''
    })

    const store = useStore()

    onMounted(async () => {
      const user = await store.state.User.user
      info.first_name = user.first_name
      info.last_name = user.last_name
      info.email = user.email
    })

    const infoSubmit = async () => {
      const {data} = await axios.put('users/info', info)
      await store.dispatch('User/setUser', data)
    }

    const passwordSubmit = async () => {
      await axios.put('users/password', password)
    }

    return {
      info,
      password,
      infoSubmit,
      passwordSubmit
    }
  }
})
</script>

<style scoped>
</style>
