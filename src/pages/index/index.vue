<script setup lang="ts">
import child from './child.vue'
import compA from '@/sub/pkgA/compA.vue'

require
  .async('../../sub/pkgA/logicA.js')
  .then((pkg) => {
    pkg.tst('main')
  })
  .catch(({ mod, errMsg }) => {
    console.error(`path: ${mod}, ${errMsg}`)
  })

require
  .async('../../sub/pkgA/dayjs/esm/index.js')
  .then((pkg) => {
    const now = pkg.dayjs()
    console.log(now)
  })
  .catch(({ mod, errMsg }) => {
    console.error(`path: ${mod}, ${errMsg}`)
  })

const handleClick = () => {
  uni.navigateTo({
    url: '/sub/pkgB/pkgB'
  })
}
</script>

<template>
  <c-flex>
    <comp-a />
    <child />
    <button @click="handleClick">pkgB</button>
  </c-flex>
</template>

<style lang="scss" scoped></style>
