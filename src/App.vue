<script setup lang="ts">
import { onHide, onShow, onLaunch } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import '@/common/scss/global.scss';
</style>
