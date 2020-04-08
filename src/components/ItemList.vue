<template>
  <ul>
    <li v-for="item in list" :key="item.id" @click="remove(item.id)">
      {{ item.title }}
    </li>
  </ul>
</template>
<script>
export default {
  props: ['list', 'remove']
}
</script>
