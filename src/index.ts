import { MotiveOptions, move } from '@xg4/motion'
import { query } from './util'

export interface Options {
  el?: string | HTMLCanvasElement
  width?: number
  height?: number
  size?: number
  lineWidth?: number
  color?: string
  x?: number
  y?: number
}

export default class Logo {
  private static PATHS = [
    {
      range: [0, 0.65],
      render({ context, x, y, radius }: Logo, currentIndex: number = 0.65) {
        const [min, max] = this.range
        if (currentIndex < min) {
          return
        }
        currentIndex = Math.min(currentIndex, max) - min

        context.beginPath()
        context.arc(
          x,
          y,
          radius,
          (1.75 - currentIndex) * Math.PI,
          1.75 * Math.PI
        )
        context.stroke()
      }
    },
    {
      range: [0.6, 1.5],
      render({ context, x, y, radius }: Logo, currentIndex: number = 1.5) {
        const [min, max] = this.range
        if (currentIndex < min) {
          return
        }
        currentIndex = Math.min(currentIndex, max) - min

        context.beginPath()
        context.arc(x, y, radius, (0.9 - currentIndex) * Math.PI, 0.9 * Math.PI)
        context.stroke()
      }
    },
    {
      range: [1.5, 3.1],
      render(
        { context, tailX, tailY, tailRadius }: Logo,
        currentIndex: number = 3.1
      ) {
        const [min, max] = this.range
        if (currentIndex < min) {
          return
        }
        currentIndex = Math.min(currentIndex, max) - min

        context.beginPath()
        context.arc(
          tailX,
          tailY,
          tailRadius,
          1 * Math.PI,
          (1 + currentIndex) * Math.PI
        )
        context.stroke()
      }
    },
    {
      range: [3.1, 3.5],
      render(
        { context, eyeX, eyeY, eyeRadius }: Logo,
        currentIndex: number = 3.5
      ) {
        const [min, max] = this.range
        if (currentIndex < min) {
          return
        }
        currentIndex = Math.min(currentIndex, max) - min

        context.beginPath()
        context.arc(eyeX, eyeY, eyeRadius, 0, currentIndex * 5 * Math.PI)
        context.fill()
      }
    }
  ]

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
    return this.radius / 8
  }

  private get eyeX() {
    return this.x - this.radius / 4 - this.eyeRadius
  }

  private get eyeY() {
    return this.y
  }

  private readonly canvas: HTMLCanvasElement
  private readonly context: CanvasRenderingContext2D

  private readonly startIndex: number
  private readonly endIndex: number

  private readonly x: number
  private readonly y: number
  private readonly radius: number

  private readonly color: string
  private readonly lineWidth: number

  public constructor({
    el,
    width,
    height,
    x,
    y,
    lineWidth = 5,
    size = 50,
    color = '#000'
  }: Options = {}) {
    this.canvas = query(el)
    if (width) {
      this.canvas.width = width
    }
    if (height) {
      this.canvas.height = height
    }
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.startIndex = -0.1
    this.endIndex = 3.7

    this.color = color
    this.lineWidth = lineWidth
    this.radius = size

    this.x = x === undefined ? this.width / 2 - this.radius / 2 : x
    this.y = y === undefined ? this.height / 2 : y
  }

  /**
   * @description render static logo
   * @param index [number]
   */
  public render(index?: number) {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.save()

    this.context.strokeStyle = this.color
    this.context.fillStyle = this.color
    this.context.lineWidth = this.lineWidth
    this.context.lineCap = 'round'

    Logo.PATHS.forEach(path => path.render(this, index))

    this.context.restore()
  }

  /**
   * @description render motive logo
   */
  public move(options: MotiveOptions = {}) {
    return move(this.render.bind(this), {
      ...options,
      from: this.startIndex,
      to: this.endIndex
    })
  }
}
