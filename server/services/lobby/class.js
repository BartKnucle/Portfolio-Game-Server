const ServiceClass = require('../service.class')

exports.Lobby = class Lobby extends ServiceClass {
  //  A player join the lobby
  join (user) {
    return this.create({
      _id: user._id,
      team: user._team
    })
      .then((game) => {
        return this.match(game)
      })
      .catch((err) => {
        this.app.log(err, 1)
      })
  }

  //  A player disjoin the lobby
  quit (userId) {
    if (this.exist(userId)) {
      return this.remove(userId)
    }
  }

  //  Try to match players to create a game
  match (game) {
    return this.find({
      team: game.team
    })
      .then((players) => {
        if (players.total === 4) {
          this.app.service('/api/games').start(game.team, players.data)
          players.data.forEach((player) => {
            this.quit(player._id)
          })
        }
      })
      .catch((err) => {
        this.app.log(err, 2)
      })
  }
}
