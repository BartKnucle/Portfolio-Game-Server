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
              this.app.log(err, true)
            })
        } else {
          this.app.service('/api/player').setGame(players[0]._id, '')
          this.remove(game._id)
            .catch((err) => {
              this.app.log(err, true)
            })
        }
      })
      .catch((err) => {
        this.app.log(err, true)
      })
  }
}
