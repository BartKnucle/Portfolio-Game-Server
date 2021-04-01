const ServiceClass = require('../network.service.class')

exports.Lobby = class Lobby extends ServiceClass {
  //  A player join the lobby
  join (msg) {
    return this.create({
      _id: msg.data._id,
      team: msg.data.team
    })
      .then((game) => {
        return this.match(game)
      })
      .catch(() => {
        return this.patch(
          msg.data._id,
          {
            _id: msg.data._id,
            team: msg.data.team
          })
      })
  }

  //  A player disjoin the lobby
  async quit (userId) {
    if (await this.exist(userId)) {
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
