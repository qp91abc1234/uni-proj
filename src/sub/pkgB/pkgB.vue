<script setup lang="ts">
require
  .async('../../sub/pkgA/dayjs/esm/index.js')
  .then((pkg) => {
    const now = pkg.dayjs()
    console.log(now)
  })
  .catch(({ mod, errMsg }) => {
    console.error(`path: ${mod}, ${errMsg}`)
  })
</script>

<template>
  <cc-flex align="center">pkgB</cc-flex>
</template>

<style lang="scss" scoped></style>
