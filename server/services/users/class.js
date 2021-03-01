const ServiceClass = require('../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
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
      .catch((err) => {
        this.app.log(err)
      })
  }

  //  On user connection
  onConnect (authResult) {
    return this.setOnline(authResult.user._id)
  }

  //  On user diconnection
  onDisconnect (connection) {
    if (connection.user) {
      return this.setOffline(connection.user._id)
        .catch(() => {
          return false
        })
    } else {
      return false
    }
  }
}
