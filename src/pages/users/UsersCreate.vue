<template>
	<form @submit.prevent="">
		<div class="mt-3 mb-3">
			<label>First Name</label>
			<input v-model="form.first_name" type="text" class="form-control" name="first_name" id="first_name"/>
		</div>
		<div class="mb-3">
			<label>Last Name</label>
			<input v-model="form.last_name" type="text" class="form-control" name="last_name" id="last_name" />
		</div>
		<div class="mb-3">
			<label>Email</label>
			<input v-model="form.email" type="text" class="form-control" name="role_id" id="role_id" />
		</div>
		<div class="mb-3">
			<label for="role_id">Role</label>
			<select v-model="form.role_id" class="form-select" name="role_id" id="role_id">
				<option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
			</select>
		</div>	
		<button class="btn btn-outline-secondary">Save</button>
	</form>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted, reactive, ref } from 'vue'

export default defineComponent({
	name: 'UsersCreate',
	setup() {
		const form = reactive({
			first_name: '',
			last_name: '',
			email: '',
			role_id: '',
		})

		const roles = ref([])
		onMounted(async () => {
			const {data} = await axios.get('roles')
			roles.value = data
		})

		const submit = () => {
			//
		}

		return { form, roles, submit }
	},
})
</script>

<style scoped></style>
