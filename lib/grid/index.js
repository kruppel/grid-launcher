'use strict'

const Hub = require('./hub')
const Node = require('./node')

module.exports = class Grid {

  constructor (options) {
    let port = options.port || 4444
    const size = options.size
    const nodes = this.nodes = []
    const hub = this.hub = new Hub({ port })

    port = 5556

    for (let i = 0; i < size; i++) {
      nodes.push(
        new Node({ port, hub: `${hub.url}/grid/register` })
      )
      port++
    }
  }

  start () {
    process.on('exit', () => this.kill())

    return new Promise((resolve, reject) => {
      this.hub.start().then(() => {
        return Promise.all(this.nodes.map(node => node.start())).then(
          () => resolve(),
          err => reject(err)
        )
      })
    })
  }

  kill (signal) {
    this.hub.kill(signal)
    this.nodes.forEach(node => node.kill(signal))
  }

}
