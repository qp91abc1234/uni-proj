import type { Canvas, CanvasHook } from '../types/render'

export default class Entity {
  protected canvasHook: CanvasHook
  protected canvas: Canvas
  protected context: CanvasRenderingContext2D

  private alphaVal = 1
  private zIndexVal = 0

  x = 0
  y = 0
  rotate = 0
  scale = 1
  w = 0
  h = 0
  anchor = { x: 0.5, y: 0.5 }
  visible = true
  parent: Entity | undefined
  children: { [zIndex: number]: Entity[] } = {}
  extraData

  constructor(canvasHook: CanvasHook) {
    this.canvasHook = canvasHook
    this.canvas = this.canvasHook.canvas.value
    this.context = this.canvasHook.context.value
  }

  get alpha() {
    let ret = this.alphaVal
    if (this.parent) {
      ret *= this.parent.alpha
    }
    return ret
  }

  set alpha(val: number) {
    this.alphaVal = val
  }

  get zIndex() {
    return this.zIndexVal
  }

  set zIndex(val) {
    const parent = this.parent
    if (parent) {
      parent.removeChild(this)
    }
    this.zIndexVal = val
    if (parent) {
      parent.addChild(this)
    }
  }

  protected get renderProps() {
    return {
      x: this.x,
      y: this.y,
      rotate: this.rotate,
      scale: this.scale,
      w: this.w,
      h: this.h,
      alpha: this.alpha,
      anchor: this.anchor
    }
  }

  async draw() {
    if (this.children) {
      const keys = Object.keys(this.children)
      for (let i = 0; i < keys.length; i++) {
        const key = Number(keys[i])
        for (let j = 0; j < this.children[key].length; j++) {
          await this.children[key][j].draw()
        }
      }
    }
  }

  addChild(child: Entity) {
    child.parent = this
    this.children[child.zIndexVal] = this.children[child.zIndexVal] || []
    this.children[child.zIndexVal].push(child)
    return child
  }

  removeChild(child: Entity) {
    child.parent = undefined
    this.children[child.zIndexVal] = this.children[child.zIndexVal] || []
    const index = this.children[child.zIndexVal].indexOf(child)
    if (index > -1) {
      this.children[child.zIndexVal].splice(index, 1)
    }
    return child
  }

  removeFromParent() {
    if (this.parent) {
      this.parent.removeChild(this)
    }
    return this
  }
}
