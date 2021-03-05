const ServiceClass = require('../service.class')

exports.Game = class Game extends ServiceClass {
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
          this.app.service('/api/player').setGame(player._id, game._id)
          this.broadcast(game._id, 'map/setSeed/' + game.seed)
        })
      })
      .catch((err) => {
        this.app.log(err, 2)
      })
  }

  quit (id, playerId) {
    this.get(id)
      .then((game) => {
        const players = game.players.filter(player => player._id !== playerId)
        if (players.length > 1) {
          this.patch(id, {
            players
          })
            .then((game) => {
              if (game.players.length < 2) {
                this.destroy(game)
              }
            })
            .catch((err) => {
              this.app.log(err, 2)
            })
        } else {
          this.app.service('/api/player').setGame(players[0]._id, '')
          this.remove(game._id)
            .catch((err) => {
              this.app.log(err, 0)
            })
        }
      })
      .catch((err) => {
        this.app.log(err, 2)
      })
  }

  // Broadcast data to all the player of a game. If playerID is submited, broadcast to the others
  broadcast (gameId, msg, playerId) {
    this.get(gameId)
      .then((game) => {
        game.players.filter(player => player._id !== playerId)
          .forEach((player) => {
            this.app.service('/api/player').send(player._id, msg)
          })
      })
      .catch((err) => {
        this.app.log(err, 2)
      })
  }
}