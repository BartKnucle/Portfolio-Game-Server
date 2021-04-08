const ServiceClass = require('../network.service.class')

exports.Players = class Players extends ServiceClass {
  patch (id, data, params) {
    return super.patch(id, data, params)
      .then((data) => {
        this.sendUpdate(data)
      })
  }

  // Send the other players the update
  sendUpdate (data) {
    this.app.service('/api/games').getPlayers(data.game)
      .then((players) => {
        players.forEach((player) => {
          if (player._id !== data._id) {
            this.send(player._id, 'update', data)
          }
        })
      })
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
