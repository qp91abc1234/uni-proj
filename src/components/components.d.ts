import CCFlex from '@/components/cc-flex/cc-flex.vue'
import CCLayout from '@/components/cc-layout/cc-layout.vue'

declare module 'vue' {
  export interface GlobalComponents {
    CCFlex: typeof CCFlex
    CCLayout: typeof CCLayout
  }
}
