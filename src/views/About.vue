<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>{{ param }}</h3>
    <item-list :list="list" :remove="deleteItem"></item-list>
  </div>
</template>
<script>
import ItemList from '@/components/ItemList.vue'
export default {
  components: {
    itemList: ItemList
  },
  data() {
    return {
      list: [
        { id: 1, title: 'task 1' },
        { id: 2, title: 'task 2' },
        { id: 3, title: 'task 3' }
      ]
    }
  },
  computed: {
    param() {
      console.log(this.$route)
      return this.$route.params.username
    }
  },
  methods: {
    deleteItem(id) {
      this.list = this.list.filter(item => {
        return item.id !== id
      })
    }
  }
}
</script>
