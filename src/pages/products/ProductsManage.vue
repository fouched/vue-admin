<template>
  <div class="pt-3 pb-2 mb-1 border-bottom text-end">
    <router-link class="btn btn-sm btn-outline-secondary" to="/products/create">Add</router-link>
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
        <td><img alt="Product Image" :src="product.image" width="50"/></td>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>
          <div class="btn-group mr-2">
            <router-link :to="`/products/${product.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit
            </router-link>
            <a class="btn btn-sm btn-outline-secondary" href="javascript:void(0)" @click="del(product.id)">Delete</a>
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
import {defineComponent, onMounted, ref} from 'vue'
import {Product} from '../../models/Product'
import TablePaginator from '../../components/TablePaginator.vue'

export default defineComponent({
  name: 'ProductsMange',
  components: {TablePaginator},
  setup() {
    const products = ref<Product[]>([])
    const lastPage = ref(0)

    const load = async (page = 1) => {
      const {data} = await axios.get(`products?page=${page}`)
      products.value = data.data
      lastPage.value = data.meta.lastPage
    }

    onMounted(load)

    const del = async (id: number) => {
      if (confirm('Are you sure?')) {
        await axios.delete(`products/${id}`)
        products.value = products.value.filter((p: Product) => p.id !== id)
      }
    }

    return {products, lastPage, del, load}
  },
})
</script>

<style></style>
