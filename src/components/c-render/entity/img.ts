import Entity from '@/components/c-render/entity/entity'

import type { CanvasHook } from '../types/render'

export default class Img extends Entity {
  private src: string
  private oriW: number = 0
  private oriH: number = 0
  round = false

  constructor(canvasHook: CanvasHook, src: string) {
    super(canvasHook)
    this.src = src
  }

  loadImg() {
    const img = this.canvas.createImage()
    img.src = this.src
    return new Promise((resolve, reject) => {
      img.onload = () => {
        this.oriW = img.width
        this.oriH = img.height
        resolve(img)
      }
      img.onerror = () => {
        reject(null)
      }
    })
  }

  async draw() {
    const img = await this.loadImg()
    if (!img || !this.visible) return
    this.context.save()
    this.canvasHook.drawImg({
      ...this.renderProps,
      img,
      oriW: this.oriW,
      oriH: this.oriH,
      round: this.round
    })
    super.draw()
    this.context.restore()
  }
}
