const ServiceClass = require('../service.class')

exports.Player = class Player extends ServiceClass {
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
          this.app.service('/api/lobby').disjoin(id)
          this.patch(id, {
            online: false
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
}
