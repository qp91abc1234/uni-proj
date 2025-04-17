import GFlex from '@/gComponents/g-flex/g-flex.vue'

declare module 'vue' {
  export interface GlobalComponents {
    GFlex: typeof GFlex
  }
}
