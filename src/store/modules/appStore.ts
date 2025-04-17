import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const windowInfo = uni.getWindowInfo()
  const capsualInfo = uni.getMenuButtonBoundingClientRect()

  return {
    windowInfo,
    capsualInfo
  }
})
