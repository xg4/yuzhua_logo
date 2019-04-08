# yuzhua logo

[![Build Status](https://www.travis-ci.org/xg4/yuzhua_logo.svg?branch=master)](https://www.travis-ci.org/xg4/yuzhua_logo)
[![npm](https://img.shields.io/npm/v/yuzhua-logo.svg)](https://www.npmjs.com/package/yuzhua-logo)
[![npm](https://img.shields.io/npm/l/yuzhua-logo.svg)](https://www.npmjs.com/package/yuzhua-logo)

## Installation

### Install with npm or Yarn

```bash
# npm
$ npm install yuzhua-logo --save
```

```bash
# yarn
$ yarn add yuzhua-logo
```

## Usage

```ts
import Logo from 'yuzhua-logo'

// with constructor options
new Logo({ x: 50, y: 50 }).render()

// render static logo
new Logo().render()

// render motive logo with options
new Logo().move({ duration: 3000 })
new Logo().move({ duration: 3000, count: 3 })
new Logo().move({ duration: 3000, count: Infinity, reverse: true })
new Logo().move({ duration: 3000, count: 0, reverse: true })
```

```ts
// typings
// constructor options
interface Options {
  // target canvas element
  el?: string | HTMLCanvasElement
  // canvas width
  width?: number
  // canvas height
  height?: number
  // logo size
  size?: number
  // logo line style
  lineWidth?: number
  color?: string
  // render position on the canvas
  x?: number
  y?: number
}

// move function options
interface MotiveOptions {
  // render time
  duration?: number
  // timing function
  ease?: easeFunc
  // render count
  count?: number
  // rendering end reversal position
  reverse?: boolean
}
```

## LICENSE

MIT
