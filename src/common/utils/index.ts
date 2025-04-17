import { useAppStore } from '@/store/modules/appStore'

export function rpx2px(val: number) {
  const appStore = useAppStore()
  return (appStore.windowInfo.windowWidth / 750) * val
}

export function px2rpx(val: number) {
  const appStore = useAppStore()
  return (val * 750) / appStore.windowInfo.windowWidth
}
