import { MotiveOptions, move } from '@xg4/motion'
import { query } from './util'

export interface Options {
  el?: string | HTMLCanvasElement
  width?: number
  height?: number
  size?: number
  lineWidth?: number
  radius?: number
  color?: string
}

export default class Logo {
  private get width() {
    return this.canvas.width
  }

  private get height() {
    return this.canvas.height
  }

  private get x() {
    return this.width / 2 - this.radius / 2
  }

  private get y() {
    return this.height / 2
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
    return this.radius / 8
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

  private radius: number
  private totalIndex: number
  private color: string

  constructor({
    el,
    width,
    height,
    lineWidth = 5,
    radius = 50,
    color = '#000',
  }: Options = {}) {
    this.canvas = query(el)
    if (width) {
      this.canvas.width = width
    }
    if (height) {
      this.canvas.height = height
    }
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.totalIndex = 3.4

    this.color = color
    this.lineWidth = lineWidth
    this.radius = radius
  }

  /**
   * @description render a static logo
   * @param idx
   */
  public render(idx?: number) {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.save()

    this.context.strokeStyle = this.color
    this.context.fillStyle = this.color
    this.context.lineWidth = this.lineWidth
    this.context.lineCap = 'round'

    this.part1(idx)
    this.part2(idx)
    this.part3(idx)
    this.part4(idx)

    this.context.restore()
  }

  /**
   * @description render a motive logo
   */
  public motion({ duration, count, reverse }: MotiveOptions = {}) {
    return move(this.render.bind(this), {
      from: 0,
      to: this.totalIndex,
      duration,
      count,
      reverse,
    })
  }

  /**
   * @description part 1 idx (0 ~ 0.6]
   * @param idx [number]
   */
  private part1(idx: number = 0.65) {
    const min = 0
    const max = 0.6
    if (idx < min) {
      return
    }
    idx = Math.min(idx, max) - min
    this.context.beginPath()
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      (1.75 - idx) * Math.PI,
      1.75 * Math.PI,
    )
    this.context.stroke()
  }

  /**
   * @description part 2 idx (0.6 ~ 1.5]
   * @param idx [number]
   */
  private part2(idx: number = 1.5) {
    const min = 0.6
    const max = 1.5
    if (idx < min) {
      return
    }
    idx = Math.min(idx, max) - min
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
   * @description part 3 idx (1.5 ~ 3.1]
   * @param idx [number]
   */
  private part3(idx: number = 3.1) {
    const min = 1.5
    const max = 3.1
    if (idx < min) {
      return
    }
    idx = Math.min(idx, max) - min
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
   * @description part 4 idx (3.1 ~ 3.2]
   * @param idx [number]
   */
  private part4(idx: number = 3.2) {
    const min = 3.1
    const max = 3.2
    if (idx < min) {
      return
    }
    idx = Math.min(idx, max) - min
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
