'use strict'

const Instance = require('./instance')

module.exports = class Hub extends Instance {

  get role () {
    return 'hub'
  }

  static get START_MESSAGE () {
    return 'Selenium Grid hub is up and running'
  }

}
