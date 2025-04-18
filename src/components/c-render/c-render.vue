<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue'

import Img from './entity/img'
import Text from './entity/text'
import Entity from './entity/entity'

import { useCanvas } from './hooks/useCanvas'
import { px2rpx, toPromiseStyle } from '@/common/utils'

const inst = getCurrentInstance()
const canvasHook = useCanvas()
const root = new Entity(canvasHook)
const renderInst = {
  canvasEleW: 0,
  canvasEleH: 0,
  drawPoster,
  addChild,
  removeChild,
  createText,
  createImg
}

let renderInstResolve
const renderInstPromise = new Promise((resolve) => {
  renderInstResolve = resolve
})

onMounted(async () => {
  await canvasHook.setup('render-canvas', inst)
  renderInst.canvasEleW = px2rpx(canvasHook.canvasEleW.value)
  renderInst.canvasEleH = px2rpx(canvasHook.canvasEleH.value)
  renderInstResolve(renderInst)
})

function drawPoster(): Promise<any> {
  canvasHook.clearScreen()
  root.draw()
  return toPromiseStyle(uni.canvasToTempFilePath, {
    x: 0,
    y: 0,
    width: canvasHook.canvasEleW.value,
    height: canvasHook.canvasEleH.value,
    destWidth: canvasHook.canvas.value.width,
    destHeight: canvasHook.canvas.value.height,
    canvas: canvasHook.canvas.value
  })
}

function addChild(child: Entity) {
  return root.addChild(child)
}

function removeChild(child: Entity) {
  return root.removeChild(child)
}

function createText(val: string) {
  return new Text(canvasHook, val)
}

function createImg(src: string) {
  return new Img(canvasHook, src)
}

defineExpose({
  getRenderInst() {
    return renderInstPromise
  }
})
</script>

<template>
  <canvas id="render-canvas" class="render-canvas" type="2d"></canvas>
</template>

<style lang="scss">
:host {
  position: absolute;
  top: -9999rpx;
}
</style>

<style lang="scss" scoped>
.render-canvas {
  width: 100%;
  height: 100%;
}
</style>
