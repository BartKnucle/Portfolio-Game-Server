const ServiceClass = require('../network.service.class')

exports.Players = class Players extends ServiceClass {
  setPosition (msg) {
    this.patch(
      msg.data._id,
      msg.data
    )
  }
}
