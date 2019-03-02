export function query(el: string | HTMLCanvasElement): HTMLCanvasElement {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected || selected.tagName !== 'CANVAS') {
      const canvas = document.createElement('canvas')
      document.body.appendChild(canvas)
      return canvas
    }
    return selected as HTMLCanvasElement
  } else {
    return el
  }
}
