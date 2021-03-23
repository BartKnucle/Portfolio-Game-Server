const ServiceClass = require('../network.service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    this.patch(null, { online: false }, { query: { online: true } })
    this.patch(null, { game: '' }, { query: { game: { $ne: null } } })
    this.patch(null, { state: '' }, { query: { state: { $ne: null } } })
    app.on('login', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  setOnline (userId) {
    return this.patch(
      userId,
      { online: true }
    )
      .catch((err) => {
        this.app.log(err)
      })
  }

  setOffline (userId) {
    return this.patch(
      userId,
      { online: false }
    )
      .then(() => {
        return this.app.service('/api/lobby').quit(userId)
      })
      .catch((err) => {
        this.app.log(err)
      })
  }

  //  On user connection
  onConnect (authResult) {
    return this.setOnline(authResult.user)
  }

  //  On user diconnection
  onDisconnect (connection) {
    if (connection.user) {
      return this.setOffline(connection.user)
        .catch(() => {
          return false
        })
    } else {
      return false
    }
  }

  receive (msg) {
    super.receive(msg)
    switch (msg.data.state) {
      case 'sendId':
        msg.socket.userId = msg.data._id
        this.setOnline(msg.data._id)
        break
      case 'joinLobby':
        this.app.service('/api/lobby').join(msg.data)
        break
      case 'quitLobby':
        this.app.service('/api/lobby').quit(msg.data)
        break
      default:
        break
    }
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
