<template>
	<div class="pt-3 pb-2 mb-1 border-bottom">
		<router-link to="/roles/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
	</div>
	<div class="table-responsive">
		<table class="table table-striped table-sm">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Image</th>
					<th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
				</tr>
			</thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td><img :src="product.id" width="50"/></td>
        </tr>
      </tbody>
		</table>
	</div>
</template>
<script lang='ts'>
import axios from 'axios'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ProductsMange',
  

  setup() {
    const products = ref([])

    onMounted( async () => {
      const { data } = await axios.get('products')

      products.value = data.data
    })

    return { 
      products 
    }
  }
})
</script>

<style>
</style>
