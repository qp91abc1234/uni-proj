<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue'

import Img from './entity/img'
import Text from './entity/text'
import Entity from './entity/entity'

import { useCanvas } from './hooks/useCanvas'

import type { RenderInst } from './types/render'

const emits = defineEmits<{
  (e: 'init', inst: RenderInst): void
}>()

const inst = getCurrentInstance()
const canvasHook = useCanvas()
const root = new Entity(canvasHook)
const renderInst: RenderInst = {
  canvasEleW: 0,
  canvasEleH: 0,
  drawPoster,
  addChild,
  removeChild,
  removeAllChild,
  createText,
  createImg
}

onMounted(async () => {
  const res = await canvasHook.setup('render-canvas', inst)
  if (!res) {
    return
  }
  renderInst.canvasEleW = canvasHook.canvasEleW.value
  renderInst.canvasEleH = canvasHook.canvasEleH.value
  emits('init', renderInst)
})

async function drawPoster() {
  canvasHook.clearScreen()
  await root.draw()
  return wx.canvasToTempFilePath({
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

function removeAllChild() {
  root.children = {}
}

function createText(val: string) {
  return new Text(canvasHook, val)
}

function createImg(src: string) {
  return new Img(canvasHook, src)
}
</script>

<template>
  <canvas id="render-canvas" class="render-canvas" type="2d"></canvas>
</template>

<style lang="scss">
:host {
  position: absolute;
  top: -9999px;
  width: 500px; // 设计分辨率，出 dpr 倍图，分享图相关单位使用 px
  height: 400px;
}
</style>

<style lang="scss" scoped>
.render-canvas {
  width: 100%;
  height: 100%;
}
</style>
