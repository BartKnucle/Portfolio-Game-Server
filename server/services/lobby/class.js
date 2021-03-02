const ServiceClass = require('../service.class')

exports.Lobby = class Lobby extends ServiceClass {
  //  A player join the lobby
  join (team, socket) {
    this.create({
      _id: socket.playerId,
      team
    })
      .then((game) => {
        this.match(game)
      })
      .catch((err) => {
        this.app.log(err, 1)
      })
  }

  //  A player disjoin the lobby
  disjoin (id) {
    this.get(id)
      .then(() => {
        this.remove(id)
          .catch((err) => {
            this.app.log(err, 2)
          })
      })
      .catch((err) => {
        this.app.log(err, 0)
      })
  }

  //  Try to match players to create a game
  match (game) {
    this.find({
      team: game.team
    })
      .then((players) => {
        if (players.total === 4) {
          this.app.service('/api/game').start(game.team, players.data)
          players.data.forEach((player) => {
            this.disjoin(player._id)
          })
        }
      })
      .catch((err) => {
        this.app.log(err, 2)
      })
  }
}
