import Logo from '../../src'

new Logo().render()
new Logo().motion({ duration: 3000 })
new Logo().motion({ duration: 3000, count: 3 })
new Logo().motion({ duration: 3000, count: 0, reverse: true })
