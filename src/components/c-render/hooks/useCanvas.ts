import { ref } from 'vue'

import { rpx2px } from '@/common/utils'
import { useAppStore } from '@/store/modules/appStore'

import type { ComponentInternalInstance } from 'vue'
import type { Canvas, IImgData, IBaseData, ITextData } from '../types/render'

export const useCanvas = () => {
  const appStore = useAppStore()

  const canvasEleW = ref(0)
  const canvasEleH = ref(0)
  const canvas = ref<Canvas>({} as Canvas)
  const context = ref<CanvasRenderingContext2D>({} as CanvasRenderingContext2D)

  function setup(id = 'canvas', inst: ComponentInternalInstance | null = null) {
    return new Promise((resolve) => {
      let query = uni.createSelectorQuery()
      if (inst) {
        query = query.in(inst)
      }
      const node = query.select(`#${id}`)
      node.fields(
        {
          size: true
        },
        () => {}
      )
      node
        .node(() => {})
        .exec((res) => {
          canvasEleW.value = res[0].width
          canvasEleH.value = res[0].height
          canvas.value = res[1].node
          const ctx = canvas.value.getContext('2d')
          if (ctx) {
            context.value = ctx
            canvas.value.width = canvasEleW.value * appStore.dpr
            canvas.value.height = canvasEleH.value * appStore.dpr
            context.value.scale(appStore.dpr, appStore.dpr)
            resolve(true)
          } else {
            resolve(false)
          }
        })
    })
  }

  function clearScreen() {
    context.value.clearRect(0, 0, canvasEleW.value, canvasEleH.value)
  }

  function baseDraw(data: IBaseData) {
    context.value.translate(rpx2px(data.x), rpx2px(data.y))
    context.value.rotate((data.rotate * Math.PI) / 180)
    context.value.scale(data.scale, data.scale)
    context.value.globalAlpha = data.alpha
  }

  function drawText(data: ITextData) {
    baseDraw(data)
    const fontSize = rpx2px(data.size)
    context.value.fillStyle = data.color
    context.value.font = `${fontSize}px ${data.font}`
    const width = context.value.measureText(data.content).width
    context.value.fillText(data.content, -width * data.anchor.x, -fontSize * (data.anchor.y - 0.5))
  }

  function drawImg(data: IImgData) {
    baseDraw(data)
    data.w = data.w === 0 ? data.oriW : data.w
    data.h = data.h === 0 ? data.oriH : data.h

    const x = -rpx2px(data.w) * data.anchor.x
    const y = -rpx2px(data.h) * data.anchor.y
    const width = rpx2px(data.w)
    const height = rpx2px(data.h)

    // 将头像剪切为圆形
    if (data.round) {
      const radius = width / 2
      context.value.beginPath()
      context.value.moveTo(x + radius, y)
      context.value.lineTo(x + width - radius, y)
      context.value.quadraticCurveTo(x + width, y, x + width, y + radius)
      context.value.lineTo(x + width, y + height - radius)
      context.value.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      context.value.lineTo(x + radius, y + height)
      context.value.quadraticCurveTo(x, y + height, x, y + height - radius)
      context.value.lineTo(x, y + radius)
      context.value.quadraticCurveTo(x, y, x + radius, y)
      context.value.closePath()
      context.value.clip()
    }

    context.value.drawImage(data.img, x, y, width, height)
  }

  return {
    canvasEleW,
    canvasEleH,
    context,
    canvas,
    setup,
    clearScreen,
    drawText,
    drawImg
  }
}
