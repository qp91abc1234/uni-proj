import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const app = ref({
    name: 'uni-app'
  })
  return {
    app
  }
})
