import Entity from '@/components/c-render/entity/entity'

import type { CanvasHook } from '../types/render'

export default class Text extends Entity {
  content = ''
  size = 20
  color = 'white'
  font = 'serif'

  constructor(canvasHook: CanvasHook, val: string) {
    super(canvasHook)
    this.content = val
  }

  async draw() {
    if (!this.visible) return
    this.context.save()
    this.canvasHook.drawText({
      ...this.renderProps,
      content: this.content,
      color: this.color,
      font: this.font,
      size: this.size
    })
    super.draw()
    this.context.restore()
  }
}
