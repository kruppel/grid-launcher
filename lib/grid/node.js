'use strict'

const Instance = require('./instance')

module.exports = class Node extends Instance {

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
