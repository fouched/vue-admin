<template>
	<NavHeader />
	<div class="container-fluid">
		<div class="row">
			<LeftMenu />
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import NavHeader from '../components/NavHeader.vue'
import LeftMenu from '../components/LeftMenu.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'PageWrapper',
	components: { NavHeader, LeftMenu },
	setup() {
		const router = useRouter()

		onMounted(async () => {
			try {
				const {data} = await axios.get('user')
				console.log(data)
			} catch (e) {
				await router.push('/login')
			}

		})
	}
})
</script>

<style scoped></style>
