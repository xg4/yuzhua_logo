import Logo from '../../src'

new Logo().render()
new Logo({ x: 50, y: 50 }).render()
new Logo().move({ duration: 3000 })
new Logo().move({ duration: 3000, count: 3 })
new Logo().move({ duration: 3000, count: Infinity, reverse: true })
new Logo().move({ duration: 3000, count: 0, reverse: true })
