const ServiceClass = require('../service.class')

exports.Player = class Player extends ServiceClass {
  setup (app) {
    this.patch(null, { online: true }, { query: { online: 'false' } })
    this.patch(null, { game: '' }, { query: { game: { $ne: '' } } })
    super.setup(app)
  }

  connect (id, socket) {
    socket.playerId = id
    this.create({
      _id: id,
      online: true
    })
      .catch(() => {
        this.patch(id,
          {
            online: true
          })
          .catch((err) => {
            this.app.log(err)
          })
      })
  }

  disconnect (id) {
    this.get(id)
      .then((player) => {
        if (player) {
          if (player.game !== '') {
            this.app.service('/api/game').quit(player.game, player._id)
          }
          this.app.service('/api/lobby').disjoin(id)
          this.patch(id, {
            online: false,
            game: ''
          })
            .catch((err) => {
              this.app.log(err)
            })
        }
      })
      .catch((err) => {
        this.app.log(err)
      })
  }

  setGame (id, gameId) {
    this.patch(id,
      {
        _id: id,
        game: gameId
      })
      .catch((err) => {
        this.app.log(err)
      })
  }
}
