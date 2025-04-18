import CFlex from '@/components/c-flex/c-flex.vue'
import CLayout from '@/components/c-layout/c-layout.vue'

declare module 'vue' {
  export interface GlobalComponents {
    CFlex: typeof CFlex
    CLayout: typeof CLayout
  }
}
