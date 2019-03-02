import { move } from '@xg4/motion'
import { query } from './util'

export interface Options {
  el: string | HTMLCanvasElement
  size?: number
  lineWidth?: number
}

export default class Logo {
  private get width() {
    return this.canvas.width
  }

  private get height() {
    return this.canvas.height
  }

  private get tailRadius() {
    return this.radius / 2
  }
  private get tailX() {
    return this.x + this.radius + this.tailRadius
  }
  private get tailY() {
    return this.y
  }

  private get eyeRadius() {
    return this.radius / 10
  }

  private get eyeX() {
    return this.x - this.radius / 4 - this.eyeRadius
  }

  private get eyeY() {
    return this.y
  }
  public lineWidth: number
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private x: number
  private y: number
  private radius: number
  private count: number

  constructor({ el, lineWidth = 5 }: Options) {
    this.canvas = query(el)
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.x = 100
    this.y = 75
    this.radius = 50
    this.lineWidth = lineWidth

    this.count = 3.4
  }

  /**
   * @description render a static logo
   * @param idx
   */
  public render(idx?: number) {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.save()

    this.context.lineWidth = this.lineWidth
    this.context.lineCap = 'round'
    this.part1(idx)
    this.part2(idx)
    this.part3(idx)
    this.part4(idx)

    this.context.restore()
  }

  /**
   * @description render a motion logo
   */
  public motion() {
    move(this.render.bind(this), {
      from: 0,
      to: this.count,
      duration: 3000,
    })
  }

  /**
   * @description part 1 idx (0 ~ 0.7]
   * @param idx [number]
   */
  private part1(idx: number = 0.7) {
    if (idx < 0) {
      return null
    }
    idx = idx > 0.7 ? 0.7 : idx
    this.context.beginPath()
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      (1.8 - idx) * Math.PI,
      1.8 * Math.PI,
    )
    this.context.stroke()
  }

  /**
   * @description part 2 idx (0.7 ~ 1.6]
   * @param idx [number]
   */
  private part2(idx: number = 1.6) {
    if (idx < 0.7) {
      return null
    }
    idx = idx > 1.6 ? 1.6 : idx
    idx = idx - 0.7
    this.context.beginPath()
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      (0.9 - idx) * Math.PI,
      0.9 * Math.PI,
    )
    this.context.stroke()
  }

  /**
   * @description part 3 idx (1.6 ~ 3.3]
   * @param idx [number]
   */
  private part3(idx: number = 3.3) {
    if (idx < 1.6) {
      return null
    }
    idx = idx > 3.3 ? 3.3 : idx
    idx = idx - 1.6
    this.context.beginPath()
    this.context.arc(
      this.tailX,
      this.tailY,
      this.tailRadius,
      1 * Math.PI,
      (1 + idx) * Math.PI,
    )
    this.context.stroke()
  }

  /**
   * @description part 4 idx (3.3 ~ 3.4]
   * @param idx [number]
   */
  private part4(idx: number = 3.4) {
    if (idx < 3.3) {
      return null
    }
    idx = idx > 3.4 ? 3.4 : idx
    idx = idx - 3.3
    this.context.beginPath()
    this.context.arc(
      this.eyeX,
      this.eyeY,
      this.eyeRadius,
      0,
      idx * 20 * Math.PI,
    )
    this.context.fill()
  }
}
