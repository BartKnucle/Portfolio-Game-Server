const ServiceClass = require('../network.service.class')

exports.Players = class Players extends ServiceClass {
  setPosition (msg) {
    this.patch(
      msg.data._id,
      msg.data
    )
  }

  //  A player disjoin the lobby
  quit (playerId) {
    this.exist(playerId)
      .then((result) => {
        if (result === true) {
          this.remove(playerId)
        }
      })
  }
}
