const ServiceClass = require('../network.service.class')

exports.Games = class Games extends ServiceClass {
  start (team, players) {
    this.create(
      {
        team,
        players,
        seed: Math.floor(Math.random() * 10000)
      }
    )
      .then((game) => {
        game.players.forEach((player) => {
          player.game = game._id
          player.score = 0
          this.app.service('/api/players').create(player)
          this.app.service('/api/users').setGame(player._id, game._id)
          this.send(player._id, 'create', game)
        })
      })
      .catch((err) => {
        this.app.log(err, true)
      })
  }

  quit (id, playerId) {
    this.exist(id)
      .then((result) => {
        if (result === true) {
          this.get(id)
            .then((game) => {
              game.players.forEach((player) => {
                this.app.service('/api/players').quit(player._id)
                this.app.service('/api/users').unsetGame(player._id)
                if (player._id !== playerId) {
                  this.send(player._id, 'quit', { _id: id })
                }
              })
            })
            .then(() => {
              this.remove(id)
            })
            .catch((err) => {
              this.app.log(err, true)
            })
        }
      })
  }

  getPlayers (gameId) {
    return this.exist(gameId)
      .then((exist) => {
        if (exist) {
          return this.get(gameId)
            .then((game) => {
              return game.players
            })
        } else {
          return []
        }
      })
  }
}
