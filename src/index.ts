import { query } from './util'

export interface Options {
  el: string | HTMLCanvasElement
  size: number
  lineWidth: number
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
    return this.y + this.radius + this.tailRadius
  }

  private get eyeRadius() {
    return this.radius / 10
  }

  private get eyeX() {
    return this.x - (3 * this.radius) / 4
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

  constructor({ el, lineWidth = 5 }: Options) {
    this.canvas = query(el)
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.x = 100
    this.y = 75
    this.radius = 50
    this.lineWidth = lineWidth
  }

  public render() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.save()

    this.context.lineWidth = this.lineWidth
    this.context.lineCap = 'round'
    this.part1()
    this.part2()
    this.part3()
    this.part4()

    this.context.restore()
  }

  /**
   * @description part 1 total angle 0.7 * Math.PI
   * @param idx
   */
  private part1(idx?: number) {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 1.1 * Math.PI, 1.8 * Math.PI)
    this.context.stroke()
  }

  /**
   * @description part 2 total angle 0.9 * Math.PI
   * @param idx
   */
  private part2(idx?: number) {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0, 0.9 * Math.PI)
    this.context.stroke()
  }

  /**
   * @description part 3 total angle 1.7 * Math.PI
   * @param idx
   */
  private part3(idx?: number) {
    this.context.beginPath()
    this.context.arc(
      this.tailX,
      this.tailY,
      this.tailRadius,
      1 * Math.PI,
      2.7 * Math.PI,
    )
    this.context.stroke()
  }

  /**
   * @description part 4 total angle 2 * Math.PI
   * @param idx
   */
  private part4(idx?: number) {
    this.context.beginPath()
    this.context.arc(this.eyeX, this.eyeY, this.eyeRadius, 0, 2 * Math.PI)
    this.context.fill()
  }
}
