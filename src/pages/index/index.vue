<template>
  <g-flex><text>123</text><view>{{ title }}</view></g-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Hello')
</script>

<style lang="scss" scoped>
</style>

