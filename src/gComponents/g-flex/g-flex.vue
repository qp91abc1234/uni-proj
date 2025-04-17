<script setup lang="ts">
withDefaults(
  defineProps<{
    dir?: 'row' | 'column'
    justify?: 'initial' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
    align?: 'initial' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
    wrap?: boolean
  }>(),
  {
    dir: 'row',
    justify: 'initial',
    align: 'initial',
    wrap: false
  }
)
</script>

<template>
  <view
    class="flex"
    :style="{
      'flex-direction': dir,
      'justify-content': justify,
      'align-items': align
    }"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
