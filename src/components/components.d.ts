import CFlex from '@/components/c-flex/c-flex.vue'
import CLayout from '@/components/c-layout/c-layout.vue'
import CRender from '@/components/c-render/c-render.vue'

declare module 'vue' {
  export interface GlobalComponents {
    CFlex: typeof CFlex
    CLayout: typeof CLayout
    CRender: typeof CRender
  }
}

export {}
