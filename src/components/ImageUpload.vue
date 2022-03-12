<template>
	<label class="btn btn-primary"> Upload <input type="file" hidden @change="upload($event.target.files)"/> </label>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, SetupContext } from 'vue'

export default defineComponent({
	name: 'ImageUpload',
	emits: ['uploaded'],
	setup(_, context: SetupContext) { // first variable props won't be used so put an underscore to tell TS we won't use it
		const upload = async (files: FileList) => {
			if (files === null) {
				return
			}

			const formData = new FormData()
			formData.append('image', files[0])

			const {data} = await axios.post('upload', formData)
			context.emit('uploaded', data.url)
		}

		return {
			upload
		}
	}
})
</script>

<style scoped></style>
