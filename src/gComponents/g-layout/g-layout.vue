<script setup lang="ts">
import { useAppStore } from '@/store/modules/appStore'

const props = withDefaults(
  defineProps<{
    bottomH?: number
    postId?: string
  }>(),
  {
    bottomH: 48,
    postId: ''
  }
)

const emit = defineEmits<{
  (e: 'reachBottom'): void
}>()

const appStore = useAppStore()
const windowInfo = appStore.windowInfo
const capsualInfo = appStore.capsualInfo

const navBarH = capsualInfo.bottom + 8
const capsuleW = capsualInfo.width + (windowInfo.windowWidth - capsualInfo.left) * 2
const navBarContentW = windowInfo.windowWidth - capsuleW
const navBarContentH = capsualInfo.height + 16

const safeAreaBottomH = windowInfo.windowHeight - (windowInfo.safeArea?.bottom || 0)
const bottomBarH = props.bottomH <= 0 ? 0 : safeAreaBottomH + props.bottomH

const contentH = windowInfo.windowHeight - navBarH - bottomBarH
</script>

<template>
  <template>
    <view class="layout">
      <view
        :style="{
          height: `${navBarH}px`
        }"
      >
        <slot name="header" :width="`${navBarContentW}px`" :height="`${navBarContentH}px`"> </slot>
      </view>
      <scroll-view
        scroll-y
        :style="{
          height: `${contentH}px`
        }"
        @scrolltolower="emit('reachBottom')"
      >
        <slot></slot>
      </scroll-view>
      <view v-if="props.bottomH > 0" :style="{ height: `${bottomBarH}px` }">
        <slot
          name="bottom"
          :content-h="`${props.bottomH}px`"
          :padding-h="`${safeAreaBottomH}px`"
        ></slot>
      </view>
    </view>
  </template>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
