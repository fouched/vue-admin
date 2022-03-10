<template>
	<div class="pt-3 pb-2 mb-1 border-bottom">
		<router-link to="/users/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
	</div>
	<div class="table-responsive">
		<table class="table table-striped table-sm">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Name</th>
					<th scope="col">Email</th>
					<th scope="col">Role</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id" class="align-middle">
					<td>{{ user.id }}</td>
					<td>{{ user.first_name }} {{ user.last_name }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.role.name }}</td>
					<td>
						<div class="btn-group mr-2">
							<router-link :to="`/users/${user.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
							<a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
<TablePaginator :lastPage="lastPage" @pageChanged="load($event)"/>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted, ref } from 'vue'
import { User } from '../../models/User'
import TablePaginator from '../../components/TablePaginator.vue'

export default defineComponent({
	name: 'UsersManage',
  components: { TablePaginator},
	setup() {
		const users = ref([])
		const lastPage = ref(0)

		const load = async (page = 1) => {
			const { data } = await axios.get(`users?page=${page}`)
			users.value = data.data
			lastPage.value = data.meta.last_page
		}

		onMounted(load)

		const del = async (id: number) => {
			if(confirm('Are you sure?')) {
				await axios.delete(`users/${id}`)
				users.value = users.value.filter((u: User) => u.id !== id)
			}
		}

		return { users, lastPage, del, load }
	},
})
</script>

<style scoped></style>
