<template>
	<form @submit.prevent="submit">
		<div class="mb-2 mt-3 row">
			<label for="name" class="col-sm-2 col-form label">Name</label>
			<div class="col-sm-10">
				<input v-model="form.name" type="text" class="form-control" name="name" id="name" />
			</div>
		</div>
		<div class="mb-3 row">
			<label class="col-sm-2 col-form label">Permissions</label>
			<div class="col-sm-10">
				<div class="form-check form-check-inline col-3" v-for="permission in permissionList" :key="permission.id" @change="select(permission.id, $event.target.checked)">
					<input type="checkbox" class="form-check-input" :value="permission.id"/>
					<label class="form-check-label">{{ permission.name }}</label>
				</div>
			</div>
		</div>
		<button class="btn btn-outline-secondary">Save</button>
	</form>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'RolesCreate',
	setup() {
		const {push} = useRouter()

		const form = reactive({
			name: '',
			permissions: [] as number[]
		})

		const permissionList = ref([])

		onMounted(async () => {
			const {data} = await axios.get('permissions')
			permissionList.value = data
		})

		const select = (id: number, checked: boolean) => {
			if (checked) {
				form.permissions = [...form.permissions, id]
				return
			}

			form.permissions = form.permissions.filter(p => p !== id)
		}

		const submit = async () => {
			await axios.post('roles', form)

			await push('/roles')
		}

		return { form, select, submit, permissionList }
	}
})
</script>

<style scoped></style>
