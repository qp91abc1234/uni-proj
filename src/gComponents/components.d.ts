import GFlex from '@/gComponents/g-flex/g-flex.vue'
import GLayout from '@/gComponents/g-layout/g-layout.vue'

declare module 'vue' {
  export interface GlobalComponents {
    GFlex: typeof GFlex
    GLayout: typeof GLayout
  }
}
