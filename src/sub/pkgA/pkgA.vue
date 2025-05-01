<script setup lang="ts">
import CompA from './compA.vue'
import { tst } from './logicA.ts'
import dayjs from './dayjs/esm/index.js'
</script>

<template>
  <cc-flex align="center">
    <CompA />
    {{ tst }}
    {{ dayjs }}
  </cc-flex>
</template>

<style lang="scss" scoped></style>
