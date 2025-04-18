import type { useCanvas } from './hooks/useCanvas'

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

export type Canvas = HTMLCanvasElement & { createImage: () => HTMLImageElement }
export type CanvasHook = ReturnType<typeof useCanvas>
