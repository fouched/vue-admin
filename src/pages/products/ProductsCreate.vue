<template>
  <form @submit.prevent="submit">
    <div class="mt-3 mb-3">
      <label>Title</label>
      <input v-model="form.title" type="text" class="form-control" name="title" id="title"/>
    </div>
    <div class="mt-3 mb-3">
      <label>Description</label>
      <textarea v-model="form.description" class="form-control" name="description" id="description"></textarea>
    </div>
    <div class="mt-3 mb-3">
      <label>Image</label>
      <div class="input-group">
        <input v-model="form.image" type="text" class="form-control" name="image" id="image"/>
        <ImageUpload @uploaded="form.image = $event"/>
      </div>
    </div>
    <div class="mt-3 mb-3">
      <label>Price</label>
      <input v-model="form.price" type="text" class="form-control" name="price" id="price"/>
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang='ts'>
import axios from 'axios'
import {defineComponent, reactive} from 'vue'
import {useRouter} from 'vue-router'
import ImageUpload from '../../components/ImageUpload.vue'

export default defineComponent({
  name: 'ProductsCreate',
  components: {
    ImageUpload
  },
  setup() {
    const router = useRouter()

    const form = reactive({
      title: '',
      description: '',
      image: '',
      price: ''
    })

    const submit = async () => {
      await axios.post('products', form)
      await router.push('/products')
    }

    return {form, submit}
  }
})
</script>

<style scoped>
</style>
