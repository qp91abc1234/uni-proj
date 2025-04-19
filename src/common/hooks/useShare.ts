import type { RenderInst } from '@/components/c-render/types/render'

export function useShare() {
  let renderInst: RenderInst

  function init(inst: RenderInst) {
    renderInst = inst
  }

  function draw(cb: (inst: RenderInst) => void) {
    if (!renderInst) {
      return
    }
    renderInst.removeAllChild()
    cb(renderInst)
  }

  const share = (title: string, path: string, imgUrl?: string, drawPoster: boolean = true) => {
    const ret = {
      title,
      path,
      imageUrl: imgUrl || ''
    }

    const promise = drawPoster
      ? new Promise<{
          title: string
          path: string
          imageUrl: string
        }>((resolve) => {
          if (!renderInst) {
            resolve(ret)
            return
          }

          renderInst.drawPoster().then((res) => {
            ret.imageUrl = res.tempFilePath
            resolve(ret)
          })
        })
      : undefined

    return {
      ...ret,
      promise
    }
  }

  return {
    init,
    draw,
    share
  }
}
