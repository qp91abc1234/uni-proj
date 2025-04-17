import { join } from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/common/scss/mixin.scss';`
      }
    }
  },
  resolve: {
    alias: {
      '@': join(__dirname, './src')
    }
  }
})
