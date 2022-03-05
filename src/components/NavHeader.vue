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
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
	name: 'NavHeader',
	setup() {
		const name = ref('')
		onMounted(async () => {
			const { data } = await axios.get('user')
			name.value = data.first_name + ' ' + data.last_name
		})

    const logout = async () => {
      await axios.post('logout')
    }

		return { name , logout}
	},
})
</script>

<style scoped></style>
