import Logo from '../../src'

new Logo({
  el: document.querySelector('#logo') as HTMLCanvasElement,
}).motion()
