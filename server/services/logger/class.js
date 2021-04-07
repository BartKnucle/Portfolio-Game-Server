const ServiceClass = require('../network.service.class')

exports.Logger = class Logger extends ServiceClass {
  setup (app) {
    app.log = this.log.bind(this)
    super.setup(app)
  }

  log (log) {
    log.data.time = log.time
    log.data.user = log.socket.userId
    if (log.data.type === 'Error' || this.app.get('env') === 'development') {
      this.create(log.data)
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log(log.message)
    }
  }
}
