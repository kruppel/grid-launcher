'use strict'

const Instance = require('./instance')

module.exports = class Node extends Instance {

  constructor (options) {
    super(options)

    const _options = this.options

    this.port = _options.port

    if (!_options.hub) {
      _options.hub = 'http://localhost:4444/grid/register'
    }
  }

  get id () {
    return `${super.id}:${this.port}`
  }

  get role () {
    return 'node'
  }

  static get START_MESSAGE () {
    return 'The node is registered to the hub and ready to use'
  }

}
