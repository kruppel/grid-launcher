'use strict'

const Instance = require('./instance')

module.exports = class Hub extends Instance {

  get role () {
    return 'hub'
  }

  get url () {
    return `http://localhost:${this.port}`
  }

  static get START_MESSAGE () {
    return 'Selenium Grid hub is up and running'
  }

}
