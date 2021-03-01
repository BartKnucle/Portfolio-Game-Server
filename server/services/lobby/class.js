const ServiceClass = require('../service.class')

exports.Lobby = class Lobby extends ServiceClass {
  join (team, socket) {
    this.create({
      _id: socket.playerId,
      team
    })
      .catch((err) => {
        this.app.log(err)
      })
  }

  disjoin (id) {
    this.remove(id)
      .catch((err) => {
        this.app.log(err)
      })
  }
}
