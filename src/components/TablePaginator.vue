<template>
	<nav>
		<ul class="pagination">
			<li class="page-item">
				<a class="page-link" href="javascript:void(0)" @click="prev">Previous</a>
			</li>
			<li class="page-item">
				<a class="page-link" href="javascript:void(0)" @click="next">Next</a>
			</li>
		</ul>
	</nav>
</template>
<script lang='ts'>
import { defineComponent, ref, SetupContext, watch } from 'vue'

export default defineComponent({
  name: 'TablePaginator',
  emits: ['pageChanged'],
  props: {
    lastPage: Number
  },
  setup(props: {lastPage: number | undefined}, context: SetupContext) {
		const page = ref(1)

    watch(page, () => {
      context.emit('pageChanged', page.value)
    })

		const next = async () => {
      if (props.lastPage) {
        if (page.value < props.lastPage) {
          page.value++
        }
      }
		}

		const prev = async () => {
			if (page.value > 1) {
				page.value--
			}
		}  
    
    return { next, prev }
  }
})
</script>

<style>
</style>
