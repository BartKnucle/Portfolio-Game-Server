const ServiceClass = require('../network.service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    this.patch(null, { online: false }, { query: { online: true } })
    this.patch(null, { game: '' }, { query: { game: { $ne: null } } })
    this.patch(null, { request: '' }, { query: { request: { $ne: null } } })
    app.on('login', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  setOnline (user) {
    this.patch(
      user._id,
      { online: true }
    )
      .catch((err) => {
        this.app.log(err)
      })
  }

  setOffline (userId) {
    this.patch(
      userId,
      { online: false }
    )
      .then(() => {
        this.app.service('/api/lobby').quit(userId)
      })
      .catch((err) => {
        this.app.log(err)
      })
  }

  //  On user connection
  onConnect (authResult) {
    this.setOnline(authResult.user)
  }

  //  On user diconnection
  onDisconnect (connection) {
    if (connection.user) {
      this.setOffline(connection.user)
    } else {
      return false
    }
  }

  setId (msg) {
    msg.socket.userId = msg.data._id
    this.patch(msg.data._id, msg.data)
      .then((data) => {
        console.log(data)
        this.setOnline(data._id)
        this.send(data._id, "setId", data)
      })
      .catch(async () => {
        await this.create(msg.data)
      })
  }

  /*
  receive (msg) {
    super.receive(msg)
      .then(() => {
        switch (msg.data.request) {
          case 'setId':
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
      })
  }
  */

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
