import type Img from '../entity/img'
import type Text from '../entity/text'
import type Entity from '../entity/entity'
import type { useCanvas } from './hooks/useCanvas'

export type CanvasHook = ReturnType<typeof useCanvas>
export type Canvas = HTMLCanvasElement & { createImage: () => HTMLImageElement }

export interface RenderInst {
  canvasEleW: number
  canvasEleH: number
  drawPoster(): Promise<{
    tempFilePath: string
  }>
  addChild(val: Entity): Entity
  removeChild(val: Entity): Entity
  removeAllChild(): void
  createText(val: string): Text
  createImg(src: string): Img
}

export interface IBaseData {
  x: number
  y: number
  rotate: number
  scale: number
  alpha: number
}

export interface ITextData extends IBaseData {
  content: string
  color: string
  font: string
  size: number
  anchor: { x: number; y: number }
}

export interface IImgData extends IBaseData {
  img: HTMLImageElement
  w: number
  h: number
  oriW: number
  oriH: number
  anchor: { x: number; y: number }
  round: boolean
}
