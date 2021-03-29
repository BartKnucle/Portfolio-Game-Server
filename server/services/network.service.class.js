const { Service } = require('feathers-nedb')

module.exports = class ServiceClass extends Service {
  constructor (options, app) {
    super(options, app)
    this.name = this.constructor.name.toLowerCase()
  }

  setup (app) {
    this.app = app
    this.started()
  }

  // Service started event
  started () {
    this.emit('started', this.name)
  }

  // Service stopped event
  stopped () {
    this.emit('stopped', this.name)
  }

  receive (msg) {
    delete msg.data.service

    return this.patch(msg.data._id, msg.data)
      .catch(() => {
        return this.create(msg.data)
      })
  }

  send (userId, request, data) {
    data.service = '/api/' + this.name
    data.request = request
    this.app.service('/api/messages').send(userId, data)
  }
}
