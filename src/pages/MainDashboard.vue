<template>
  <h2 class="mt-3 mb-4">Daily Sales</h2>
  <div id="chart"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import * as c3 from 'c3'
import axios from "axios";

export default defineComponent({
  name: 'MainDashboard',
  setup() {

    onMounted(async () => {
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            ['x'],
            ['Sales']
          ],
          types: {
            Sales: 'bar'
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
      })

      const {data} = await axios.get('chart')
      console.log(data)
      chart.load({
        columns: [
          ['x', ...data.map((r: any) => r.date)],
          ['Sales', ...data.map((r: any) => r.sum)]
        ]
      })
    })
  }
})
</script>

<style scoped></style>
