const ServiceClass = require('./service.class')

module.exports = class NetServiceClass extends ServiceClass {
  receive (msg) {
    delete msg.data.service
    if (msg.data.request) {
      this[msg.data.request](msg)
    } else {
      msg.data.request = "Patch"
      this.patch(msg.data._id, msg.data)
        .catch((err) => {
          this.app.log(err)
        })
    }
  }

  send (userId, request, data) {
    data.service = '/api/' + this.name
    data.request = request
    this.app.service('/api/messages').send(userId, data)
  }
}
