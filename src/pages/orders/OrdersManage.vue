<template>
  <div class="table-responsive">
    <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Total Price</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="order in orders" :key="order.id">
        <tr>
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.email }}</td>
          <td>{{ order.total }}</td>
          <td>
            <div class="btn-group mr-2">
              <a class="btn btn-sm btn-outline-secondary" href="javascript:void(0)" @click="select(order.id)">View</a>
            </div>
          </td>
        </tr>
        <tr v-if="selected === order.id">
          <td colspan="5">
            <!--<div class="overflow-hidden" :class="selected === order.id ? 'show' : 'hide'">-->
            <div>
              <table class="table table-sm" style="background-color: aliceblue">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Product Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in order.order_items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.product_title }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.price }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </td>

        </tr>

      </template>
      </tbody>
    </table>
  </div>
  <TablePaginator :lastPage="lastPage" @pageChanged="load($event)"/>
</template>

<script lang='ts'>
import axios from 'axios'
import {defineComponent, onMounted, ref} from 'vue'
import TablePaginator from '../../components/TablePaginator.vue'
import {Order} from "../../models/Order"

export default defineComponent({
  name: 'OrdersManage',
  components: {TablePaginator},
  setup() {
    const orders = ref<Order[]>([])
    const lastPage = ref(0)
    const selected = ref(0)

    const load = async (page = 1) => {
      const {data} = await axios.get(`orders?page=${page}`)
      orders.value = data.data
      lastPage.value = data.meta.last_page
    }

    onMounted(load)

    const select = (id: number) => {
      selected.value = selected.value !== id ? id : 0
    }

    return {
      orders,
      lastPage,
      load,
      select,
      selected
    }
  }
})
</script>

<style scoped>

</style>
