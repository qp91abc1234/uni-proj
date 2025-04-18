import { useAppStore } from '@/store/modules/appStore'

export function rpx2px(val: number) {
  const appStore = useAppStore()
  return (appStore.windowInfo.windowWidth / 750) * val
}

export function px2rpx(val: number) {
  const appStore = useAppStore()
  return (val * 750) / appStore.windowInfo.windowWidth
}

export function toPromiseStyle(cb, params = {}) {
  return new Promise((resolve, reject) => {
    cb({
      ...params,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
