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
  }

  setOffline (userId) {
    return this.patch(
      userId,
      { online: false }
    )
  }

  //  On user connection
  onConnect (authResult) {
    switch (authResult.user.type) {
      case 'device':
        this.app.service('/api/devices').setOnline(authResult.user._id)
        break
      default:
        break
    }
    return this.setOnline(authResult.user._id)
  }

  //  On user diconnection
  onDisconnect (connection) {
    if (connection.user) {
      switch (connection.user.type) {
        case 'device':
          this.app.service('/api/devices').setOffline(connection.user._id)
          break
        default:
          break
      }
      return this.setOffline(connection.user._id)
        .catch(() => {
          return false
        })
    } else {
      return false
    }
  }
}
