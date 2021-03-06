'use strict'

const spawn = require('child_process').spawn
const jar = require('selenium-server-standalone-jar')

module.exports = class Instance {

  constructor (options) {
    this.options = Object.assign({}, options)
    this.port = options.port
    this.isStarted = false
  }

  get id () {
    return this.role
  }

  get flags () {
    const options = this.options

    return Object.keys(options).reduce((flags, key) => {
      flags.push(`-${key}`, options[key])

      return flags
    }, [])
  }

  start () {
    const START_MESSAGE = this.constructor.START_MESSAGE
    const _process = this.process = spawn(
      'java',
      ['-jar', jar.path, '-role', this.role].concat(this.flags)
    )

    _process.on('SIGINT', () => this.kill('SIGINT'))
    process.on('exit', () => this.kill())

    return new Promise((resolve, reject) => {
      _process.stderr.on('data', data => {
        const isStarted = this.isStarted
        const message = data.toString()

        this.log(message)

        if (!isStarted && message.indexOf(START_MESSAGE) !== -1) {
          this.isStarted = true
          resolve()
        }
      })
    })
  }

  log (message) {
    if (process.env.DEBUG) {
      process.stdout.write(
        message.split('\n').reduce((buffer, line) => {
          if (line.length > 0) {
            buffer += `[${this.id}] ${line}\n`
          }

          return buffer
        }, '')
      )
    }
  }

  kill (signal) {
    const _process = this.process

    if (!_process) { return }

    this.isStarted = false
    this.process = null

    _process.kill(signal)
  }

}
