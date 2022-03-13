<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
    <div>
      <router-link class="p-2 text-white text-decoration-none" to="/profile">{{ name }}</router-link>
      <router-link class="p-2 text-white text-decoration-none" to="/login" @click="logout">Sign out</router-link>
    </div>
  </header>
</template>
<script lang="ts">
import axios from 'axios'
import {computed, defineComponent, ref, watch} from 'vue'
import {useStore} from "vuex";

export default defineComponent({
  name: 'NavHeader',
  setup() {
    const name = ref('')
    const store = useStore()
    const user = computed(() => store.state.User.user)

    watch(user, () => {
      name.value = user.value.first_name + ' ' + user.value.last_name
    })

    const logout = async () => {
      await axios.post('logout')
    }

    return {name, logout}
  },
})
</script>

<style scoped></style>
